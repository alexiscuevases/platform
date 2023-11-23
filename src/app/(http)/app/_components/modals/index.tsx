"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
  IoAdd,
  IoCloudDownloadOutline,
  IoCloudUploadOutline,
  IoEarthOutline,
  IoInformationCircleOutline,
  IoLanguageOutline,
  IoWarningOutline
} from "react-icons/io5";
import Field from "./field";
import { ErrorsInterface } from "interfaces";

interface OptionInterface {
  id: string;
}

interface FieldInterface {
  type: "text" | "number" | "email" | "password" | "textarea" | "file" | "checkbox" | "select";
  id: string;
  title?: string;
  disabled?: boolean;
  information?: string;
  warning?: string;
  multi_values?: boolean;
  default_property?: any;
  options?: OptionInterface[];
  value?: string;
  default_value?: string;
}

interface SectionInterface {
  type: "fields" | "taxes" | "variations";
  title: string;
  information?: string;
  fields?: FieldInterface[] | FieldInterface[][];
}

interface Props {
  isOpen: boolean;
  setOpen: any;
  action: string;
  handler: any;
  sections: SectionInterface[];
  data: any;
  setData: any;
  resourcesInformation?: any;
  setDeletedResources?: any;
  errors: ErrorsInterface<any>;
  resources?: any;
  setResources?: any;
  waitingResponse: boolean;
}

export default function Modal({
  isOpen,
  setOpen,
  action,
  handler,
  sections,
  data,
  setData,
  resourcesInformation,
  setDeletedResources,
  errors,
  resources,
  setResources,
  waitingResponse
}: Props) {
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
              {sections.map((section, index) => (
                <div className="space-y-4" key={index}>
                  <div>
                    <p className="text-xl font-semibold">{section.title}</p>
                    {section.information && (
                      <p className="flex items-center space-x-1 text-xs text-slate-600 duration-200">
                        <IoInformationCircleOutline size={16} />
                        <span>{section.information}</span>
                      </p>
                    )}
                  </div>
                  {section.type === "variations" && (
                    <>
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
                        <span>Añadir variación</span>
                      </button>
                      <button className="flex items-center space-x-1 text-xs text-primary duration-200 hover:text-primary-dark">
                        <IoEarthOutline size={14} />
                        <span>Variación por mercado</span>
                      </button>
                    </>
                  )}
                  {section.type === "fields" &&
                    section.fields?.map((field, index) => (
                      <div key={index} className="space-y-2">
                        <div className={!Array.isArray(field) ? "space-y-6" : "flex space-x-6"}>
                          {Array.isArray(field) ?
                            field.map((field, index) => (
                              <div
                                key={index}
                                className={`group relative w-full ${
                                  field.disabled &&
                                  "rounded-2xl border border-white-full-dark bg-white-full-dark bg-opacity-20"
                                }`}>
                                <Field
                                  fieldData={field}
                                  data={field}
                                  setData={setData}
                                  resources={resources}
                                  setResources={setResources}
                                  setDeletedResources={setDeletedResources}
                                />
                              </div>
                            ))
                          : <div>
                              <div
                                className={`group relative w-full ${
                                  field.disabled &&
                                  "rounded-2xl border border-white-full-dark bg-white-full-dark bg-opacity-20"
                                } ${field.type === "checkbox" && "flex space-x-2"}`}>
                                <Field
                                  fieldData={field}
                                  data={field}
                                  setData={setData}
                                  resources={resources}
                                  setResources={setResources}
                                  setDeletedResources={setDeletedResources}
                                />
                              </div>
                              {errors[field.id] ?
                                <p className="text-xs text-danger">{errors[field.id]}</p>
                              : field.information && (
                                  <p className="mt-2 text-xs text-white-full-dark">{field.information}</p>
                                )
                              }
                            </div>
                          }
                        </div>
                        {field.multi_values && (
                          <button className="flex items-center space-x-1 text-xs text-primary duration-200 hover:text-primary-dark">
                            <IoLanguageOutline size={16} />
                            <span>Traducciones</span>
                          </button>
                        )}
                        {field.warning && (
                          <p className="flex items-center space-x-1 text-xs text-orange-500 duration-200">
                            <IoWarningOutline size={16} />
                            <span>{field.warning}</span>
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between p-6">
              <div>
                {resourcesInformation?.uploading && (
                  <p className="flex animate-pulse items-center space-x-2 text-sm text-primary">
                    <IoCloudUploadOutline size={18} />
                    <span>Subiendo archivos</span>
                  </p>
                )}
                {resourcesInformation?.deleting && (
                  <p className="flex animate-pulse items-center space-x-2 text-sm text-primary">
                    <IoCloudDownloadOutline size={18} />
                    <span>Eliminando archivos</span>
                  </p>
                )}
              </div>
              <div className="flex space-x-3">
                {!waitingResponse ?
                  <>
                    <button className="button button-secondary" onClick={() => setOpen(false)}>
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => handler()}
                      className="button button-primary flex items-center space-x-2">
                      <IoAdd size={22} />
                      <span>{action}</span>
                    </button>
                  </>
                : <>
                    <button className="button-secondary-disabled">Cancelar</button>
                    <button type="button" className="button-disabled flex items-center space-x-2">
                      <IoAdd size={22} />
                      <span>{action}</span>
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
