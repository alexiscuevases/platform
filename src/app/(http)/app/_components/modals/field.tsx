import { ResourceController } from "@controllers/resource";
import Image from "next/image";
import { IoAdd, IoCloudUploadOutline, IoTrash } from "react-icons/io5";

export default function Field({ fieldData, data, errors, setData, resources, setDeletedResources, setResources }) {
  const resourceController = new ResourceController();

  return (
    <>
      {(fieldData.type === "text" ||
        fieldData.type === "number" ||
        fieldData.type === "email" ||
        fieldData.type === "date") && (
        <input
          type={fieldData.type}
          id={fieldData.id}
          onChange={e =>
            fieldData.default_property ?
              setData(prevState => ({
                ...prevState,
                [fieldData.id]: { [fieldData.default_property]: e.target.value }
              }))
            : setData(prevState => ({ ...prevState, [fieldData.id]: e.target.value }))
          }
          defaultValue={fieldData.default_value}
          value={fieldData.value}
          disabled={fieldData.disabled}
          placeholder=" "
          className={`w-full px-4 pb-2 pt-6 ${
            fieldData.disabled ?
              "cursor-not-allowed  text-white-full-dark"
            : `peer rounded-2xl border outline-none transition-all ${
                errors[fieldData.id] ?
                  "border-danger caret-danger hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
                : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
              }`
          }`}
        />
      )}
      {fieldData.type === "checkbox" && (
        <input
          type="checkbox"
          id={fieldData.id}
          defaultChecked={fieldData.default_value}
          checked={fieldData.checked}
          onChange={e =>
            fieldData.default_property ?
              setData(prevState => ({
                ...prevState,
                [fieldData.id]: { [fieldData.default_property]: e.target.checked }
              }))
            : setData(prevState => ({ ...prevState, [fieldData.id]: e.target.checked }))
          }
        />
      )}
      {fieldData.type === "textarea" && (
        <textarea
          id={fieldData.id}
          onChange={e =>
            fieldData.default_property ?
              setData(prevState => ({
                ...prevState,
                [fieldData.id]: { [fieldData.default_property]: e.target.value }
              }))
            : setData(prevState => ({ ...prevState, [fieldData.id]: e.target.value }))
          }
          value={fieldData.value}
          defaultValue={fieldData.default_value}
          disabled={fieldData.disabled}
          placeholder=" "
          className={`peer max-h-[200px] min-h-[100px] w-full rounded-2xl border bg-transparent px-4 pb-2 pt-6 outline-none transition-shadow ${
            errors[fieldData.id] ?
              "border-danger caret-danger hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
            : "caret-primary hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
          } `}
        />
      )}
      {fieldData.type === "select" && (
        <select
          id={fieldData.id}
          onChange={e => {
            fieldData.default_property ?
              setData(prevState => ({
                ...prevState,
                [fieldData.id]: { [fieldData.default_property]: e.target.value }
              }))
            : setData(prevState => ({ ...prevState, [fieldData.id]: e.target.value }));
          }}
          defaultValue={fieldData.default_value}
          value={fieldData.value}
          disabled={fieldData.disabled}
          multiple={fieldData.multiple ? true : false}
          className={`peer h-[58px] w-full cursor-pointer rounded-2xl border px-3 pb-2 pt-6 outline-none transition-all ${
            errors[fieldData.id] ?
              "border-danger hover:shadow-[0_0_0_4px_hsla(353,100%,35%,.1)] focus:shadow-[inset_0_0_0_1px_hsla(353,100%,35%,1),0_0_0_4px_hsla(353,100%,35%,0.1)]"
            : "hover:shadow-[0_0_0_4px_hsla(244,49%,49%,.1)] focus:shadow-[inset_0_0_0_2px_hsla(244,49%,49%,1),0_0_0_4px_hsla(244,49%,49%,0.1)]"
          }`}>
          <option value="">- Selecciona una opción -</option>
          {fieldData.options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>
      )}
      {fieldData.type === "file" && (
        <>
          <input
            type="file"
            id={fieldData.id}
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => setResources(prevState => [...prevState, ...Array.from(e.target.files)])}
          />
          {resources.length > 0 || data[fieldData.id]?.length > 0 ?
            <div className="relative grid min-h-[147px] w-full grid-cols-4 gap-2 rounded-xl">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="relative max-h-[167px] min-h-[147px] w-full cursor-pointer duration-200 hover:scale-[1.025]">
                  <div className="absolute right-0 top-0 flex items-center justify-center space-x-2 rounded-bl-xl bg-white px-2 py-1">
                    <button
                      onClick={() => setResources(resources.filter(resourceToDelete => resource !== resourceToDelete))}
                      className="bg-white text-slate-600 duration-200 hover:text-danger">
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
              {data[fieldData.id]?.map((resource, index) => (
                <div
                  key={index}
                  className="relative max-h-[167px] min-h-[147px] w-full cursor-pointer duration-200 hover:scale-[1.025]">
                  <div className="absolute right-0 top-0 flex items-center justify-center space-x-2 rounded-bl-xl bg-white px-2 py-1">
                    <button
                      onClick={() =>
                        setDeletedResources({
                          ...data,
                          resource
                        })
                      }
                      className="bg-white text-slate-600 duration-200 hover:text-danger">
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
        </>
      )}
      {fieldData.type !== "file" && fieldData.type !== "checkbox" ?
        <label
          htmlFor={fieldData.id}
          className={`absolute left-4 right-4 ${
            errors[fieldData.id] ? "text-danger" : "text-white-full-dark"
          } selection:bg-transparent ${
            fieldData.disabled ?
              "top-2 cursor-not-allowed text-xs"
            : `top-4 ${
                fieldData.type === "select" ? "cursor-pointer" : "cursor-text"
              } transition-all peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`
          }`}>
          {fieldData.title}
        </label>
      : <label htmlFor={fieldData.id} className="text-sm font-medium">
          {fieldData.title}
        </label>
      }
    </>
  );
}
