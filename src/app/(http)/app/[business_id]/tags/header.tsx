"use client";

import { BusinessApiResponseInterface, CreateTagInterface, ErrorsInterface } from "interfaces";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import Modal from "../../_components/modals";
import { useRouter } from "next/navigation";
import { TagController } from "controllers";

interface Props {
  business: BusinessApiResponseInterface;
}

export default function Header({ business }: Props) {
  // @ts-expect-error
  const [data, setData] = useState<CreateTagInterface>({});
  const [isOpen, setOpen] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsInterface<CreateTagInterface>>({});
  const tagController = new TagController();
  const router = useRouter();

  const handler = async () => {
    if (waitingResponse) return;
    setWaitingResponse(true);
    setErrors({});

    const response = await tagController.create(business._id, data);
    if (!response.success) return setErrors(response.errors), setWaitingResponse(false);

    setWaitingResponse(false);
    setOpen(false);
    router.refresh();
  };

  return (
    <div className="flex justify-between">
      <h1 className="text-xl font-bold">Etiquetas</h1>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="button button-primary flex items-center space-x-2">
          <IoAdd size={22} />
          <span>Nueva etiqueta</span>
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        setOpen={setOpen}
        action="Nueva etiqueta"
        handler={handler}
        sections={[
          {
            type: "fields",
            title: "Nueva etiqueta",
            fields: [
              {
                id: "name",
                title: "Nombre",
                type: "text"
              }
            ]
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
