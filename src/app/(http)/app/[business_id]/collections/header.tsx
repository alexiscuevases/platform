"use client";

import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import Modal from "../../_components/modals";
import { useRouter } from "next/navigation";
import { Business } from "@typescript/models/business";
import { CollectionController } from "@controllers/business/collection";
import { GeneralErrors } from "@typescript/others";
import { CreateCollection } from "@typescript/models/business/collection";
import { createBusinessURL } from "@helpers/createBusinessURL";

interface Props {
  business: Business;
}

export default function Header({ business }: Props) {
  // @ts-expect-error
  const [data, setData] = useState<CreateCollectionInterface>({});
  const [resources, setResources] = useState<any[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [deletedResources, setDeletedResources] = useState<any[]>([]);
  const [resourcesInformation, setResourcesInformation] = useState({
    uploading: false,
    deleting: false
  });
  const [errors, setErrors] = useState<GeneralErrors<CreateCollection>>({});
  const collectionController = new CollectionController();
  const router = useRouter();

  const handler = async () => {
    if (waitingResponse) return;
    setWaitingResponse(true);
    setErrors({});

    const response = await collectionController.create(business._id, data);
    if (!response.success) return setErrors(response.errors), setWaitingResponse(false);

    setWaitingResponse(false);
    setOpen(false);
    router.refresh();
  };

  return (
    <div className="flex justify-between">
      <h1 className="text-xl font-bold">Colecciones</h1>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="button button-primary flex items-center space-x-2">
          <IoAdd size={22} />
          <span>Nueva colección</span>
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        setOpen={setOpen}
        action="Nueva colección"
        handler={handler}
        sections={[
          {
            type: "fields",
            title: "Nueva colección",
            fields: [
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
            title: "Otros",
            fields: [
              {
                id: "path",
                title: "Path de la colección",
                type: "text",
                information: `${createBusinessURL(business)}/collections/${
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
