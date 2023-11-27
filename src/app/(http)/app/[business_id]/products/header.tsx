"use client";

import { useEffect, useState } from "react";
import { IoAdd, IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import Modal from "../../_components/modals";
import { useRouter } from "next/navigation";
import { Business } from "@typescript/models/business";
import { ProductController } from "@controllers/business/product";
import { createBusinessURL } from "@helpers/createBusinessURL";
import { currencyFormat } from "@helpers/currencyFormat";
import { GeneralErrors } from "@typescript/others";
import { CreateProduct } from "@typescript/models/business/product";
import { ParsedCategory } from "@typescript/models/business/category";
import { getCategoriesByBusinessId } from "@services/business/category";
import { SchemaParser } from "@utils/schemaParser";
import { getCollectionsByBusinessId } from "@services/business/collection";
import { getProvidersByBusinessId } from "@services/business/provider";
import { getTagsByBusinessId } from "@services/business/tag";
import { ParsedCollection } from "@typescript/models/business/collection";

interface Props {
  business: Business;
}

export default function Header({ business }: Props) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<ParsedCategory[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  const [collections, setCollections] = useState<ParsedCollection[]>([]);
  const [collectionOptions, setCollectionOptions] = useState<any[]>([]);
  const [providerOptions, setProviderOptions] = useState<any[]>([]);
  const [tagOptions, setTagOptions] = useState<any[]>([]);
  // @ts-expect-error
  const [data, setData] = useState<CreateProductInterface>({});
  const [resources, setResources] = useState<any[]>([]);
  const [resourcesInformation, setResourcesInformation] = useState({
    uploading: false,
    deleting: false
  });
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [errors, setErrors] = useState<GeneralErrors<CreateProduct>>({});

  const productController = new ProductController();
  const router = useRouter();

  const handler = async () => {
    if (waitingResponse) return;
    setWaitingResponse(true);
    setErrors({});

    const response = await productController.create(business._id, data);
    if (!response.success) return setErrors(response.errors), setWaitingResponse(false);

    if (resources.length > 0) {
      setResourcesInformation({ ...resourcesInformation, uploading: true });
      await productController.uploadResources(business._id, response.result._id, [
        ...(data.resources ? data.resources : []),
        ...resources
      ]);
      setResourcesInformation({ ...resourcesInformation, uploading: false });
    }

    setWaitingResponse(false);
    setOpen(false);
    router.refresh();
  };

  useEffect(() => {
    const Categories = async () => {
      const response = await getCategoriesByBusinessId(business._id);
      if (response.result) {
        const parsedCategories = [];
        const parsedCategoryOptions = [];
        response.result.forEach(category => {
          const parsedCategory = new SchemaParser({
            language_code: "ES",
            currency_code: "COP"
          }).parseCategory(category);
          parsedCategories.push(category);
          parsedCategoryOptions.push({ value: parsedCategory._id, title: parsedCategory.name });
        });
        setCategories(parsedCategories);
        setCategoryOptions(parsedCategoryOptions);
      }
    };

    const Collections = async () => {
      const response = await getCollectionsByBusinessId(business._id);
      if (response.result) {
        const parsedCollections = [];
        const parsedCollectionOptions = [];
        response.result.forEach(collection => {
          const parsedCollection = new SchemaParser({
            language_code: "ES",
            currency_code: "COP"
          }).parseCollection(collection);
          parsedCollections.push(collection);
          parsedCollectionOptions.push({ value: parsedCollection._id, title: parsedCollection.name });
        });
        setCollections(parsedCollections);
        setCollectionOptions(parsedCollectionOptions);
      }
    };

    const Providers = async () => {
      const response = await getProvidersByBusinessId(business._id);
      if (response.result) {
        const providerOptions = [];
        response.result.forEach(provider => providerOptions.push({ value: provider._id, title: provider.name }));
        setProviderOptions(providerOptions);
      }
    };

    const Tags = async () => {
      const response = await getTagsByBusinessId(business._id);
      if (response.result) {
        const tagOptions = [];
        response.result.forEach(tag => tagOptions.push({ value: tag._id, title: tag.name }));
        setTagOptions(tagOptions);
      }
    };

    Collections();
    Categories();
    Providers();
    Tags();
  }, [business]);

  return (
    <div className="flex justify-between">
      <h1 className="text-xl font-bold">Productos</h1>
      <div className="flex space-x-2">
        <Link href="marketplace" className="button button-secondary flex items-center space-x-2">
          <IoSearchOutline size={20} />
          <span>Marketplace</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="button button-primary flex items-center space-x-2">
          <IoAdd size={22} />
          <span>Nuevo producto</span>
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        setOpen={setOpen}
        action="Nuevo producto"
        handler={handler}
        sections={[
          {
            type: "fields",
            title: "Nuevo Producto",
            fields: [
              {
                id: "reference",
                title: "Referencia",
                type: "text"
              },
              {
                id: "names",
                title: "Nombre",
                type: "text",
                multi_values: "Traducciones",
                multi_values_type: "language",
                default_property: "Default"
              },
              {
                id: "descriptions",
                title: "Descripción",
                type: "textarea",
                multi_values: "Traducciones",
                multi_values_type: "language",
                default_property: "Default"
              }
            ]
          },
          {
            type: "fields",
            title: "Imagenes y videos",
            fields: [
              {
                id: "resources",
                type: "file"
              }
            ]
          },
          {
            type: "fields",
            title: "Precios, costos y ganancias",
            multi_values: "Precios, costo y ganancias por mercado",
            multi_values_type: "market",
            fields: [
              [
                {
                  id: "prices",
                  title: "Precio",
                  type: "number",
                  default_property: "Default"
                },
                {
                  id: "comparation_prices",
                  title: "Precio de comparación",
                  type: "number",
                  default_property: "Default"
                }
              ],
              [
                {
                  id: "costs",
                  title: "Costo",
                  type: "number",
                  default_property: "Default"
                },
                {
                  id: "earnings",
                  title: "Ganancias",
                  type: "text",
                  value:
                    data.prices && data.costs ?
                      currencyFormat({ value: data.prices.Default - data.costs.Default, currency: "COP" })
                    : "- - -",
                  disabled: true
                },
                {
                  id: "margen",
                  title: "Margen",
                  type: "text",
                  value:
                    data.prices && data.costs ?
                      `${Math.floor(((data.prices.Default - data.costs.Default) / data.prices.Default) * 100)}%`
                    : "- - - ",
                  disabled: true
                }
              ]
            ]
          },
          {
            type: "variations",
            title: "Variaciones del producto",
            multi_values: "Variaciones por mercado",
            multi_values_type: "market",
            default_property: "Default"
          },
          {
            type: "fields",
            title: "Organización del producto",
            fields: [
              {
                id: "category",
                title: "Categoría",
                type: "select",
                options: categoryOptions,
                warning: "No has definido ningún impuesto para esta categoría"
              },
              {
                id: "providers",
                title: "Proveedores",
                options: providerOptions,
                multiple: true,
                type: "select"
              },
              {
                id: "collections",
                title: "Colecciones",
                options: collectionOptions,
                multiple: true,
                type: "select"
              },
              {
                id: "tags",
                title: "Etiquetas",
                options: tagOptions,
                multiple: true,
                type: "select"
              }
            ]
          },
          {
            type: "fields",
            title: "Impuestos",
            information: "Los impuestos se aplícan dependiendo de la categoría del producto",
            fields: [
              {
                id: "sales_tax",
                title: "Aplicar impuestos a la venta del producto",
                type: "checkbox"
              }
            ]
          },
          {
            type: "fields",
            title: "Otros",
            fields: [
              {
                id: "path",
                title: "Path del producto",
                type: "text",
                information: `${createBusinessURL(business)}/products/${
                  data.path || data.names ?
                    (!data.path ? data.names.Default : data.path).toLowerCase().trim().replace(/ /g, "-")
                  : ""
                }`
              }
            ]
          }
        ]}
        data={data}
        setData={setData}
        resourcesInformation={resourcesInformation}
        errors={errors}
        resources={resources}
        setResources={setResources}
        waitingResponse={waitingResponse}
      />
    </div>
  );
}
