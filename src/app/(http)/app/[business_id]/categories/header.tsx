"use client";

import { BusinessApiResponseInterface, CreateCategoryInterface, ErrorsInterface } from "interfaces";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import Modal from "../../_components/modals";
import { useRouter } from "next/navigation";
import { CategoryController } from "controllers";

interface Props {
  business: BusinessApiResponseInterface;
}

export default function Header({ business }: Props) {
  // @ts-expect-error
  const [data, setData] = useState<CreateCategoryInterface>({});
  const [isOpen, setOpen] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsInterface<CreateCategoryInterface>>({});
  const categoryController = new CategoryController();
  const router = useRouter();

  const handler = async () => {
    if (waitingResponse) return;
    setWaitingResponse(true);
    setErrors({});

    const response = await categoryController.create(business._id, data);
    if (!response.success) return setErrors(response.errors), setWaitingResponse(false);

    setWaitingResponse(false);
    setOpen(false);
    router.refresh();
  };

  return (
    <div className="flex justify-between">
      <h1 className="text-xl font-bold">Categorías</h1>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="button button-primary flex items-center space-x-2">
          <IoAdd size={22} />
          <span>Nueva categoría</span>
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        setOpen={setOpen}
        action="Nueva categoría"
        handler={handler}
        sections={[
          {
            type: "fields",
            title: "Nueva categoría",
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
            title: "Organización de la categoría",
            fields: [
              {
                id: "category",
                title: "Categoría",
                type: "select",
                options: []
              }
            ]
          },
          {
            type: "taxes",
            title: "Impuestos"
          }
        ]}
        data={data}
        setData={setData}
        errors={errors}
        waitingResponse={waitingResponse}
      />
    </div>
  );
}
