"use client";

import { getTagsByBusinessId } from "@services/business/tag";
import { Business } from "@typescript/models/business";
import { Tag } from "@typescript/models/business/tag";
import { useEffect, useState } from "react";
import { IoOpenOutline } from "react-icons/io5";

interface Props {
  business: Business;
}

export function TagsTable({ business }: Props) {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const Tags = async () => {
      const response = await getTagsByBusinessId(business._id);
      if (response.result) setTags(response.result);
    };

    Tags();
  }, [business]);

  return (
    <table className="w-full table-fixed">
      <thead>
        <tr>
          <th className="w-full px-2 text-left text-sm font-bold">Etiqueta</th>
          <th className="w-[100px]"></th>
        </tr>
      </thead>
      <tbody className="w-full">
        {tags.map((category, index) => (
          <tr key={index} className="group cursor-default border-t">
            <td className="flex flex-col px-2 py-2">{category.name}</td>
            <td className="px-2">
              <div className="flex justify-end space-x-4">
                <button className="text-slate-600 duration-200 hover:scale-110 hover:text-slate-700">
                  <IoOpenOutline size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
