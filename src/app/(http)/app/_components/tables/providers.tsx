"use client";

import { getProvidersByBusinessId } from "@services/business/provider";
import { Business } from "@typescript/models/business";
import { Provider } from "@typescript/models/business/provider";
import { useEffect, useState } from "react";
import { IoOpenOutline } from "react-icons/io5";

interface Props {
  business: Business;
}

export function ProvidersTable({ business }: Props) {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const Providers = async () => {
      const response = await getProvidersByBusinessId(business._id);
      if (response.result) setProviders(response.result);
    };

    Providers();
  }, [business]);

  return (
    <table className="w-full table-fixed">
      <thead>
        <tr>
          <th className="w-full px-2 text-left text-sm font-bold">Proveedor</th>
          <th className="w-[100px]"></th>
        </tr>
      </thead>
      <tbody className="w-full">
        {providers.map((provider, index) => (
          <tr key={index} className="group cursor-default border-t">
            <td className="flex flex-col px-2 py-2">{provider.name}</td>
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
