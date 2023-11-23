"use client";

import { ProductController, ResourceController } from "controllers";
import { AnimatePresence, motion } from "framer-motion";
import { createBusinessURL } from "helpers";
import {
  BusinessApiResponseInterface,
  CreateProductInterface,
  DeleteResourceInterface,
  ErrorsInterface,
  ProductApiResponseInterface
} from "interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  IoAdd,
  IoCloudUploadOutline,
  IoEarthOutline,
  IoInformationCircleOutline,
  IoLanguageOutline,
  IoTrash,
  IoWarningOutline
} from "react-icons/io5";

interface Props {
  business: BusinessApiResponseInterface;
  isOpen: boolean;
  setOpened: any;
  action?: "create" | "update" | "duplicate";
  product?: ProductApiResponseInterface;
}

export default function ProductModal({ isOpen, setOpened, business, action = "create", product }: Props) {
  // @ts-expect-error
  const [data, setData] = useState<CreateProductInterface>(action !== "create" && product ? product : {});
  const [resources, setResources] = useState<any[]>([]);
  const [resourcesInformation, setResourcesInformation] = useState({
    uploading: false,
    deleting: false
  });
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsInterface<CreateProductInterface>>({});
  const productController = new ProductController();
  const resourceController = new ResourceController();
  const router = useRouter();

  const modalHandler = async () => {
    if (waitingResponse) return;
    setWaitingResponse(true);
    setErrors({});

    let response;
    if (action === "update") response = await productController.update(business._id, product._id, data);
    else response = await productController.create(business._id, data);
    if (!response.success) return setErrors(response.errors), setWaitingResponse(false);

    const deletedResources = product.resources?.filter(
      productResource => !data.resources.find(dataResource => productResource === dataResource)
    );
    if (deletedResources && deletedResources.length > 0) {
      setResourcesInformation({ ...resourcesInformation, deleting: true });
      await resourceController.deleteResources(deletedResources as DeleteResourceInterface[]);
      setResourcesInformation({ ...resourcesInformation, deleting: false });
    }

    if (resources.length > 0) {
      setResourcesInformation({ ...resourcesInformation, uploading: true });
      await productController.uploadResources(
        business._id,
        response.result._id,
        action === "update" ? [...(data.resources ? data.resources : []), ...resources] : resources
      );
      setResourcesInformation({ ...resourcesInformation, uploading: false });
    }

    setWaitingResponse(false);
    setOpened(false);
    router.refresh();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute left-0 top-0 flex h-full w-full justify-center px-2 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0 h-full w-full bg-black"
          />
          <motion.div
            initial={{ translateY: "-60%" }}
            animate={{ translateY: 0 }}
            exit={{ translateY: "-100%", opacity: 0 }}
            className="flex w-full max-w-[700px] flex-col justify-between rounded-xl bg-white shadow-2xl">
            <div className="no-scrollbar space-y-6 overflow-y-scroll px-6 py-8">
              <div className="space-y-4">
                <p className="text-xl font-semibold">
                  {action === "update" ? "Actualizar producto" : "Nuevo producto"}
                </p>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="group relative w-full">
                      <input
                        type="text"
                        id="name"
                        onChange={e => setData(prevState => ({ ...prevState, names: { Default: e.target.value } }))}
                        value={data.names?.["Default"]}
                        placeholder=" "
                        className="peer w-full rounded-2xl border bg-transparent px-4 pb-2 pt-6 caret-primary outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-4 right-4 top-4 cursor-text text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                        Nombre
                      </label>
                    </div>
                    {business.subscription_plan !== "Free" && (
                      <button className="flex items-center space-x-1 text-xs text-primary duration-200 hover:text-primary-dark">
                        <IoLanguageOutline size={16} />
                        <span>Traducciones</span>
                      </button>
                    )}
                  </div>
                  <div>
                    <div className="group relative w-full">
                      <textarea
                        id="description"
                        onChange={e =>
                          setData(prevState => ({ ...prevState, descriptions: { Default: e.target.value } }))
                        }
                        value={data.descriptions?.["Default"]}
                        placeholder=" "
                        className="peer max-h-[200px] min-h-[100px] w-full rounded-2xl border bg-transparent px-4 pb-2 pt-6 caret-primary outline-none transition-shadow hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                      />
                      <label
                        htmlFor="description"
                        className="absolute left-4 right-4 top-4 cursor-text text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                        Descripción
                      </label>
                    </div>
                    {business.subscription_plan !== "Free" && (
                      <button className="flex items-center space-x-1 text-xs text-primary duration-200 hover:text-primary-dark">
                        <IoLanguageOutline size={16} />
                        <span>Traducciones</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-xl font-semibold">Imagenes y videos</p>
                <input
                  type="file"
                  id="resources"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={e => setResources(prevState => [...prevState, ...Array.from(e.target.files)])}
                />
                {resources.length > 0 || data.resources?.length > 0 ?
                  <div className="relative grid min-h-[147px] w-full grid-cols-4 gap-2 rounded-xl">
                    {resources.map((resource, index) => (
                      <div
                        key={index}
                        className="relative max-h-[167px] min-h-[147px] w-full cursor-pointer duration-200 hover:scale-[1.025]">
                        <div className="absolute right-0 top-0 flex items-center justify-center space-x-2 rounded-bl-xl bg-white px-2 py-1">
                          <button
                            onClick={() =>
                              setResources(resources.filter(resourceToDelete => resource !== resourceToDelete))
                            }
                            className="hover:text-danger bg-white text-slate-600 duration-200">
                            <IoTrash size={16} />
                          </button>
                        </div>
                        <Image
                          className="h-full w-full rounded-xl object-cover"
                          width={100}
                          height={100}
                          alt=""
                          src={URL.createObjectURL(resource)}
                        />
                      </div>
                    ))}
                    {action === "update" &&
                      data.resources?.map((resource, index) => (
                        <div
                          key={index}
                          className="relative max-h-[167px] min-h-[147px] w-full cursor-pointer duration-200 hover:scale-[1.025]">
                          <div className="absolute right-0 top-0 flex items-center justify-center space-x-2 rounded-bl-xl bg-white px-2 py-1">
                            <button
                              onClick={() =>
                                setData({
                                  ...data,
                                  resources: data.resources.filter(resourceToDelete => resource !== resourceToDelete)
                                })
                              }
                              className="hover:text-danger bg-white text-slate-600 duration-200">
                              <IoTrash size={16} />
                            </button>
                          </div>
                          <Image
                            className="h-full w-full rounded-xl object-cover"
                            width={100}
                            height={100}
                            quality={85}
                            alt=""
                            src={resourceController.getResourceUrlByPublicId(resource.path)}
                          />
                        </div>
                      ))}
                    <label
                      htmlFor="resources"
                      className="flex h-full min-h-[147px] cursor-pointer items-center justify-center rounded-xl border border-dashed border-slate-600 text-slate-600 duration-200 hover:scale-[1.025]">
                      <IoAdd size={40} />
                    </label>
                  </div>
                : <label
                    htmlFor="resources"
                    className="relative flex min-h-[200px] cursor-pointer items-center justify-center rounded-xl border border-dashed duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary">
                    <div className="flex flex-col items-center justify-center">
                      <IoCloudUploadOutline size={40} />
                      <span>Añadir archivo(s)</span>
                    </div>
                  </label>
                }
              </div>
              <div className="space-y-4">
                <p className="text-xl font-semibold">Precios, costos y ganancias</p>
                <div className="flex space-x-6">
                  <div className="group relative w-full flex-1">
                    <input
                      type="number"
                      id="price"
                      onChange={(e: any) =>
                        setData(prevState => ({ ...prevState, prices: { Default: Number(e.target.value) } }))
                      }
                      value={data.prices?.["Default"]}
                      placeholder=" "
                      className="peer w-full rounded-2xl border bg-transparent px-4 pb-2 pt-6 caret-primary outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                    />
                    <label
                      htmlFor="price"
                      className="absolute left-4 right-4 top-4 cursor-text text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                      Precio
                    </label>
                  </div>
                  <div className="group relative w-full flex-1">
                    <input
                      type="number"
                      id="comparation_price"
                      onChange={(e: any) =>
                        setData(prevState => ({
                          ...prevState,
                          comparation_prices: { Default: Number(e.target.value) }
                        }))
                      }
                      value={data.comparation_prices?.["Default"]}
                      placeholder=" "
                      className="peer w-full rounded-2xl border bg-transparent px-4 pb-2 pt-6 caret-primary outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                    />
                    <label
                      htmlFor="comparation_price"
                      className="absolute left-4 right-4 top-4 cursor-text text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                      Precio de comparación
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex space-x-6">
                    <div className="group relative w-full flex-1">
                      <input
                        type="number"
                        id="cost"
                        onChange={(e: any) =>
                          setData(prevState => ({ ...prevState, costs: { Default: Number(e.target.value) } }))
                        }
                        value={data.costs?.["Default"]}
                        placeholder=" "
                        className="peer w-full rounded-2xl border bg-transparent px-4 pb-2 pt-6 caret-primary outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                      />
                      <label
                        htmlFor="cost"
                        className="absolute left-4 right-4 top-4 cursor-text text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                        Costo
                      </label>
                    </div>
                    <div className="group relative w-full flex-1 rounded-2xl border border-white-full-dark bg-white-full-dark bg-opacity-20">
                      <input
                        type="text"
                        id="earnings"
                        value={
                          data.prices && data.costs ?
                            new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
                              data.prices.Default - data.costs.Default
                            )
                          : "- - - "
                        }
                        className="w-full cursor-not-allowed rounded-2xl bg-transparent px-4 pb-2 pt-6 text-white-full-dark"
                        disabled
                      />
                      <label
                        htmlFor="earnings"
                        className="absolute left-4 right-4 top-2 cursor-not-allowed text-xs text-white-full-dark selection:bg-transparent">
                        Ganancias
                      </label>
                    </div>
                    <div className="group relative w-full flex-1 rounded-2xl border border-white-full-dark bg-white-full-dark bg-opacity-20">
                      <input
                        type="text"
                        id="margin"
                        value={
                          data.prices && data.costs ?
                            `${Math.floor(((data.prices.Default - data.costs.Default) / data.prices.Default) * 100)}%`
                          : "- - - "
                        }
                        className="w-full cursor-not-allowed rounded-2xl bg-transparent px-4 pb-2 pt-6 text-white-full-dark"
                        disabled
                      />
                      <label
                        htmlFor="margin"
                        className="absolute left-4 right-4 top-2 cursor-not-allowed text-xs text-white-full-dark selection:bg-transparent">
                        Margen
                      </label>
                    </div>
                  </div>
                  {business.subscription_plan !== "Free" && (
                    <button className="flex items-center space-x-1 text-xs text-primary duration-200 hover:text-primary-dark">
                      <IoEarthOutline size={14} />
                      <span>Precios, costo y ganancias por mercado</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-xl font-semibold">Variaciones del producto</p>
                {data.variations &&
                  data.variations.Default.map((variation, variations_index) => (
                    <div key={variations_index} className="space-y-2">
                      <input
                        type="text"
                        value={data.variations?.Default[variations_index].name}
                        onChange={e => {
                          const updatedData = data;
                          updatedData.variations.Default[variations_index].name = e.target.value;
                          setData(prevState => ({ ...prevState, ...updatedData }));
                        }}
                        className="h-12 w-full rounded-xl border bg-transparent text-center caret-primary outline-none duration-200 hover:shadow-[0_0_0_2px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(244,49%,49%,1),0_0_0_2px_hsla(244,49%,49%,0.1)]"
                      />
                      <div className="space-y-2">
                        {variation.values &&
                          variation.values.map((value, values_index) => (
                            <div key={values_index} className="px-4">
                              <input
                                type="text"
                                value={data.variations?.Default[variations_index].values[values_index].name}
                                onChange={e => {
                                  const updatedData = data;
                                  updatedData.variations.Default[variations_index].values[values_index].name =
                                    e.target.value;
                                  setData(prevState => ({ ...prevState, ...updatedData }));
                                }}
                                className="h-10 w-full rounded-xl border bg-transparent text-center caret-primary outline-none duration-200 hover:shadow-[0_0_0_2px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(244,49%,49%,1),0_0_0_2px_hsla(244,49%,49%,0.1)]"
                              />
                            </div>
                          ))}
                        <div className="px-4">
                          <button
                            onClick={() => {
                              const newData = data;
                              newData.variations.Default[variations_index].values.push({ name: "" });
                              setData(prevState => ({ ...prevState, ...newData }));
                            }}
                            className="flex h-10 w-full items-center justify-center gap-1 rounded-xl border border-dashed font-light duration-200 hover:border-primary hover:text-primary">
                            <IoAdd size={18} />
                            <span>Añadir valor a la variación</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                <button
                  onClick={() => {
                    setData(currentData => ({
                      ...currentData,
                      variations: {
                        Default:
                          currentData.variations && currentData.variations.Default ?
                            [...currentData.variations.Default, { name: "", values: [] }]
                          : [{ name: "", values: [] }]
                      }
                    }));
                  }}
                  className="flex h-12 w-full items-center justify-center gap-1 rounded-xl border border-dashed font-light duration-200 hover:border-primary hover:text-primary">
                  <IoAdd fontWeight={0.5} size={20} />
                  <span>Añadir variación del producto</span>
                </button>
                {business.subscription_plan !== "Free" && (
                  <button className="flex items-center space-x-1 text-xs text-primary duration-200 hover:text-primary-dark">
                    <IoEarthOutline size={14} />
                    <span>Variación del producto por mercado</span>
                  </button>
                )}
              </div>
              <div className="space-y-4">
                <p className="text-xl font-semibold">Organización del producto</p>
                <div className="space-y-2">
                  <div className="group relative">
                    <select
                      id="category"
                      // onChange={(e) => setData((prevState) => ({ ...prevState, category: e.target.value }))}
                      className="peer h-[58px] w-full cursor-pointer rounded-2xl border px-3 pb-2 pt-6 outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,_49%,_49%,_.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]">
                      <option value="">- Selecciona una opción -</option>
                    </select>
                    <label
                      htmlFor="category"
                      className="absolute left-4 right-4 top-4 cursor-pointer text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                      Categoría
                    </label>
                  </div>
                  <p className="flex items-center space-x-1 text-xs text-orange-500 duration-200">
                    <IoWarningOutline size={16} />
                    <span>No has definido ningún impuesto para esta categoría</span>
                  </p>
                </div>
                <div className="group relative">
                  <input
                    type="text"
                    id="provider"
                    // onChange={(e: any) => setData((prevState) => ({ ...prevState, provider: e.target.value }))}
                    placeholder=" "
                    className="peer w-full rounded-2xl border bg-transparent px-4 pb-2 pt-6 caret-primary outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                  />
                  <label
                    htmlFor="provider"
                    className="absolute left-4 right-4 top-4 cursor-text text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                    Proveedor
                  </label>
                </div>
                <div className="group relative">
                  <input
                    type="text"
                    id="collection"
                    // onChange={(e: any) =>
                    //   setData((prevState) => ({
                    //     ...prevState,
                    //     collections: [...prevState.collections, e.target.value]
                    //   }))
                    // }
                    placeholder=" "
                    className="peer w-full rounded-2xl border bg-transparent px-4 pb-2 pt-6 caret-primary outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                  />
                  <label
                    htmlFor="collection"
                    className="absolute left-4 right-4 top-4 cursor-text text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                    Colecciones
                  </label>
                </div>
                <div className="group relative">
                  <input
                    type="text"
                    id="tag"
                    // onChange={(e: any) =>
                    //   setData((prevState) => ({ ...prevState, tags: [...prevState.tags, e.target.value] }))
                    // }
                    placeholder=" "
                    className="peer w-full rounded-2xl border bg-transparent px-4 pb-2 pt-6 caret-primary outline-none transition-all hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                  />
                  <label
                    htmlFor="tag"
                    className="absolute left-4 right-4 top-4 cursor-text text-white-full-dark transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                    Etiquetas
                  </label>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xl font-semibold">Impuestos</p>
                  <p className="flex items-center space-x-1 text-xs text-slate-600 duration-200">
                    <IoInformationCircleOutline size={16} />
                    <span>Los impuestos se aplícan dependiendo de la categoría del producto</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="tax"
                    checked={data.sales_tax}
                    onChange={e => setData(prevState => ({ ...prevState, sales_tax: e.target.checked }))}
                  />
                  <label htmlFor="tax" className="text-sm font-medium">
                    Aplicar impuestos a la venta del producto
                  </label>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-xl font-semibold">Otros</p>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="group relative w-full">
                      <input
                        type="text"
                        id="path"
                        onChange={e => setData(prevState => ({ ...prevState, path: e.target.value }))}
                        value={data.path}
                        placeholder=" "
                        className={`peer w-full border ${
                          errors.path ?
                            "border-danger caret-danger hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                          : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
                        } rounded-2xl  bg-transparent px-4 pb-2 pt-6 outline-none transition-all `}
                      />
                      <label
                        htmlFor="path"
                        className={`absolute left-4 right-4 top-4 cursor-text ${
                          errors.path ? "text-danger" : "text-white-full-dark"
                        } transition-all selection:bg-transparent peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}>
                        Path del producto
                      </label>
                    </div>
                    {errors.path ?
                      <p className="text-danger text-xs">{errors.path}</p>
                    : <p className="mt-2 text-xs text-white-full-dark">
                        {createBusinessURL(business)}/products/
                        {(data.path || data.names) &&
                          (!data.path ? data.names.Default : data.path).toLowerCase().trim().replace(/ /g, "-")}
                      </p>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-6">
              <div>
                {resourcesInformation.uploading && (
                  <p className="animate-pulse text-xs text-primary">Subiendo archivos</p>
                )}
                {resourcesInformation.deleting && (
                  <p className="animate-pulse text-xs text-primary">Eliminando archivos</p>
                )}
              </div>
              <div className="flex space-x-3">
                {!waitingResponse ?
                  <>
                    <button className="button button-secondary" onClick={() => setOpened(false)}>
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => modalHandler()}
                      className="button button-primary flex items-center space-x-2">
                      <IoAdd size={22} />
                      {action === "update" ?
                        <span>Actualizar producto</span>
                      : <span>Nuevo producto</span>}
                    </button>
                  </>
                : <>
                    <button className="button-secondary-disabled">Cancelar</button>
                    <button type="button" className="button-disabled flex items-center space-x-2">
                      <IoAdd size={22} />
                      {action === "update" ?
                        <span>Actualizar producto</span>
                      : <span>Nuevo producto</span>}
                    </button>
                  </>
                }
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
