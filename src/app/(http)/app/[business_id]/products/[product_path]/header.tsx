"use client";

import { useEffect, useState } from "react";
import { IoCreateOutline, IoDuplicateOutline } from "react-icons/io5";
import Modal from "../../../_components/modals";
import { useRouter } from "next/navigation";
import { Business } from "@typescript/models/business";
import { ResourceController } from "@controllers/resource";
import { ProductController } from "@controllers/business/product";
import { DeleteResource } from "@typescript/models/resource";
import { createBusinessURL } from "@helpers/createBusinessURL";
import { currencyFormat } from "@helpers/currencyFormat";
import { GeneralErrors } from "@typescript/others";
import { CreateProduct, Product } from "@typescript/models/business/product";
import { ParsedCategory } from "@typescript/models/business/category";
import { getCategoriesByBusinessId } from "@services/business/category";
import { SchemaParser } from "@utils/schemaParser";
import { copyObjectAndExcludeKeys } from "@helpers/copyAndExcludeObjectKeys";

interface Props {
  business: Business;
  product: Product;
}

export default function Header({ business, product }: Props) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [action, setAction] = useState<"edit" | "duplicate">(null);
  const [categories, setCategories] = useState<ParsedCategory[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  // @ts-expect-error
  const [data, setData] = useState<CreateProductInterface>({});
  const [resources, setResources] = useState<any[]>([]);
  const [deletedResources, setDeletedResources] = useState<any[]>([]);
  const [resourcesInformation, setResourcesInformation] = useState({
    uploading: false,
    deleting: false
  });
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [errors, setErrors] = useState<GeneralErrors<CreateProduct>>({});
  const resourceController = new ResourceController();
  const productController = new ProductController();
  const router = useRouter();

  const handler = async () => {
    if (waitingResponse) return;
    setWaitingResponse(true);
    setErrors({});

    const response = await productController.update(business._id, product._id, data);
    if (!response.success) return setErrors(response.errors), setWaitingResponse(false);

    if (deletedResources && deletedResources.length > 0) {
      setResourcesInformation({ ...resourcesInformation, deleting: true });
      await resourceController.deleteResources(deletedResources as DeleteResource[]);
      setResourcesInformation({ ...resourcesInformation, deleting: false });
    }

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

    Categories();
  }, [business]);

  return (
    <div className="flex justify-between">
      <h1 className="text-xl font-bold">{product.names["Default"]}</h1>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => {
            setData(
              copyObjectAndExcludeKeys({
                object: product,
                keysToExclude: ["_id", "creation_date", "update_date"]
              })
            );
            setAction("edit");
            setOpen(true);
          }}
          className="button button-secondary flex items-center space-x-2">
          <IoCreateOutline size={22} />
          <span>Editar</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setData(
              copyObjectAndExcludeKeys({
                object: product,
                keysToExclude: ["_id", "creation_date", "update_date", "reference", "path"]
              })
            );
            setAction("duplicate");
            setOpen(true);
          }}
          className="button button-primary flex items-center space-x-2">
          <IoDuplicateOutline size={22} />
          <span>Duplicar</span>
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        setOpen={setOpen}
        action={action === "edit" ? "Editar producto" : "Nuevo producto"}
        handler={handler}
        sections={[
          {
            type: "fields",
            title: `${action === "edit" ? "Editar producto" : "Nuevo producto"}`,
            fields: [
              {
                id: "reference",
                title: "Referencia",
                type: "text",
                value: data.reference
              },
              {
                id: "names",
                title: "Nombre",
                type: "text",
                multi_values: "Traducciones",
                multi_values_type: "language",
                default_property: "Default",
                value: data.names?.Default
              },
              {
                id: "descriptions",
                title: "Descripción",
                type: "textarea",
                multi_values: "Traducciones",
                multi_values_type: "language",
                default_property: "Default",
                value: data.descriptions?.Default
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
                  default_property: "Default",
                  value: data.prices?.Default
                },
                {
                  id: "comparation_prices",
                  title: "Precio de comparación",
                  type: "number",
                  default_property: "Default",
                  value: data.comparation_prices?.Default
                }
              ],
              [
                {
                  id: "costs",
                  title: "Costo",
                  type: "number",
                  default_property: "Default",
                  value: data.costs?.Default
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
                type: "text"
              },
              {
                id: "colelctions",
                title: "Colecciones",
                type: "text"
              },
              {
                id: "tags",
                title: "Etiquetas",
                type: "text"
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
                type: "checkbox",
                checked: data.sales_tax
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
                value: data.path,
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
        setDeletedResources={setDeletedResources}
        errors={errors}
        resources={resources}
        setResources={setResources}
        waitingResponse={waitingResponse}
      />
    </div>
  );
}
