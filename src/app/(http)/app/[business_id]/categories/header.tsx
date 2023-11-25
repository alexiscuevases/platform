"use client";

import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import Modal from "../../_components/modals";
import { useRouter } from "next/navigation";
import { Business } from "@typescript/models/business";
import { CategoryController } from "@controllers/business/category";
import { GeneralErrors } from "@typescript/others";
import { CreateCategory, ParsedCategory } from "@typescript/models/business/category";
import { getCategoriesByBusinessId } from "@services/business/category";
import { SchemaParser } from "@utils/schemaParser";

interface Props {
  business: Business;
}

export default function Header({ business }: Props) {
  // @ts-expect-error
  const [data, setData] = useState<CreateCategoryInterface>({});
  const [isOpen, setOpen] = useState(false);
  const [categories, setCategories] = useState<ParsedCategory[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [errors, setErrors] = useState<GeneralErrors<CreateCategory>>({});
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
            title: "Organización de la categoría",
            fields: [
              {
                id: "category",
                title: "Categoría",
                type: "select",
                options: categoryOptions
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
