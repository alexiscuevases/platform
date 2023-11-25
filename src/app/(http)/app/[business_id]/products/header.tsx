"use client";

import { useState } from "react";
import { IoAdd, IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import Modal from "../../_components/modals";
import { useRouter } from "next/navigation";
import { Business } from "@typescript/models/business";
import { ResourceController } from "@controllers/resource";
import { ProductController } from "@controllers/business/product";
import { DeleteResource } from "@typescript/models/resource";
import { createBusinessURL } from "@helpers/createBusinessURL";
import { currencyFormat } from "@helpers/currencyFormat";
import { GeneralErrors } from "@typescript/others";
import { CreateProduct } from "@typescript/models/business/product";

interface Props {
  business: Business;
}

export default function Header({ business }: Props) {
  const [isOpen, setOpen] = useState<boolean>(false);
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

    const response = await productController.create(business._id, data);
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
                id: "names",
                title: "Nombre",
                type: "text",
                multi_values: true,
                default_property: "Default"
              },
              {
                id: "descriptions",
                title: "Descripción",
                type: "textarea",
                multi_values: true,
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
            fields: [
              [
                {
                  id: "prices",
                  title: "Precio",
                  type: "number",
                  multi_values: true,
                  default_property: "Default"
                },
                {
                  id: "comparation_prices",
                  title: "Precio de comparación",
                  type: "number",
                  multi_values: true,
                  default_property: "Default"
                }
              ],
              [
                {
                  id: "costs",
                  title: "Costo",
                  type: "number",
                  multi_values: true,
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
            title: "Variaciones del producto"
          },
          {
            type: "fields",
            title: "Organización del producto",
            fields: [
              {
                id: "category",
                title: "Categoría",
                type: "select",
                options: [],
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
        setDeletedResources={setDeletedResources}
        errors={errors}
        resources={resources}
        setResources={setResources}
        waitingResponse={waitingResponse}
      />
    </div>
  );
}
