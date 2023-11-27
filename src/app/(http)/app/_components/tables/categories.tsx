"use client";

import { getCategoriesByBusinessId } from "@services/business/category";
import { Business } from "@typescript/models/business";
import { ParsedCategory } from "@typescript/models/business/category";
import { SchemaParser } from "@utils/schemaParser";
import { useEffect, useState } from "react";
import { IoOpenOutline, IoTrash } from "react-icons/io5";

interface Props {
  business: Business;
}

export function CategoriesTable({ business }: Props) {
  const [categories, setCategories] = useState<ParsedCategory[]>([]);

  useEffect(() => {
    const Categories = async () => {
      const response = await getCategoriesByBusinessId(business._id);
      if (response.result) {
        const parsedCategories = [];
        response.result.forEach(category => {
          const parsedCategory = new SchemaParser({
            language_code: "ES",
            currency_code: "COP"
          }).parseCategory(category);
          parsedCategories.push(parsedCategory);
        });
        setCategories(parsedCategories);
      }
    };

    Categories();
  }, [business]);

  return (
    <table className="w-full table-fixed">
      <thead>
        <tr>
          <th className="w-full px-2 text-left text-sm font-bold">Categoría</th>
          <th className="w-[100px] px-2 text-left text-sm font-bold">Productos</th>
          <th className="w-[100px]"></th>
        </tr>
      </thead>
      <tbody className="w-full">
        {categories.map((category, index) => (
          <tr key={index} className="group cursor-default border-t">
            <td className="flex flex-col px-2 py-2">
              <p className="max-w-[350px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-primary-full-dark group-hover:text-primary-dark">
                {category.name}
              </p>
              <p className="max-w-[350px] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-600">
                {category.description}
              </p>
            </td>
            <td className="px-2">{category.products_count}</td>
            <td className="px-2">
              <div className="flex justify-end space-x-4">
                <button className="text-slate-600 duration-200 hover:scale-110 hover:text-slate-700">
                  <IoOpenOutline size={18} />
                </button>
                <button className="text-slate-600 duration-200 hover:scale-110 hover:text-danger">
                  <IoTrash size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
