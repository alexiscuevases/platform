"use client";

import { getCollectionsByBusinessId } from "@services/business/collection";
import { Business } from "@typescript/models/business";
import { ParsedCollection } from "@typescript/models/business/collection";
import { SchemaParser } from "@utils/schemaParser";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoOpenOutline, IoTrash } from "react-icons/io5";

interface Props {
  business: Business;
}

export function CollectionsTable({ business }: Props) {
  const [collections, setCollection] = useState<ParsedCollection[]>([]);

  useEffect(() => {
    const Collection = async () => {
      const response = await getCollectionsByBusinessId(business._id);
      if (response.result) {
        const parsedCollections = [];
        response.result.forEach(collection => {
          const parsedCollection = new SchemaParser({
            language_code: "ES",
            currency_code: "COP"
          }).parseCollection(collection);
          parsedCollections.push(parsedCollection);
        });
        setCollection(parsedCollections);
      }
    };

    Collection();
  }, [business]);

  return (
    <table className="w-full table-fixed">
      <thead>
        <tr>
          <th className="w-full px-2 text-left text-sm font-bold">Colección</th>
          <th className="w-[100px] px-2 text-left text-sm font-bold">Productos</th>
          <th className="w-[100px]"></th>
        </tr>
      </thead>
      <tbody className="w-full">
        {collections.map((collection, index) => (
          <tr key={index} className="group cursor-default border-t">
            <td className="flex space-x-2 px-2 py-2">
              <div className="h-10 w-10">
                {collection.resources.length > 0 ?
                  <Image
                    className="h-full w-full rounded-lg object-cover"
                    height={50}
                    width={50}
                    quality={75}
                    alt=""
                    src={collection.resources[0]}
                  />
                : <div className="flex h-full w-full items-center justify-center rounded-lg bg-primary/5"></div>}
              </div>
              <div className="flex flex-col">
                <p className="max-w-[350px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-primary-full-dark group-hover:text-primary-dark">
                  {collection.name}
                </p>
                <p className="max-w-[350px] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-600">
                  {collection.description}
                </p>
              </div>
            </td>
            <td className="px-2">{collection.products_count}</td>
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
