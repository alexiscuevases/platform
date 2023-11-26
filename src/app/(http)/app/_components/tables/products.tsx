"use client";

import { IoEye, IoOpenOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SchemaParser } from "@utils/schemaParser";
import { getProductsByBusinessId } from "@services/business/product";
import { ParsedProduct } from "@typescript/models/business/product";
import { Business } from "@typescript/models/business";
import { currencyFormat } from "@helpers/currencyFormat";
import { createBusinessURL } from "@helpers/createBusinessURL";

interface Props {
  business: Business;
}

export function ProductsTable({ business }: Props) {
  const [products, setProducts] = useState<ParsedProduct[]>([]);

  useEffect(() => {
    const Products = async () => {
      const response = await getProductsByBusinessId(business._id);
      if (response.result) {
        const parsedProducts = [];
        response.result.forEach(product => {
          const parsedProdudct = new SchemaParser({
            language_code: "ES",
            currency_code: "COP"
          }).parseProduct(product);
          parsedProducts.push(parsedProdudct);
        });
        setProducts(parsedProducts);
      }
    };

    Products();
  }, [business]);

  return (
    <table className="w-full table-fixed">
      <thead>
        <tr>
          <th className="w-[120px] px-2 text-left text-sm font-bold">Referencia</th>
          <th className="w-full px-2 text-left text-sm font-bold">Producto</th>
          <th className="w-[120px] px-2 text-left text-sm font-bold">Estado</th>
          <th className="w-[140px] px-2 text-left text-sm font-bold">Precio</th>
          <th className="w-[100px]"></th>
        </tr>
      </thead>
      <tbody className="w-full">
        {products.map((product, index) => (
          <tr key={index} className="group cursor-default border-t">
            <td className="px-2 text-left">
              <Link href="123456" className="border-dashed border-primary text-sm text-primary group-hover:border-b">
                {product.reference}
              </Link>
            </td>
            <td className="flex space-x-2 px-2 py-2">
              <div className="h-10 w-10">
                {product.resources.length > 0 ?
                  <Image
                    className="h-full w-full rounded-lg object-cover"
                    height={50}
                    width={50}
                    quality={75}
                    alt=""
                    src={product.resources[0]}
                  />
                : <div className="flex h-full w-full items-center justify-center rounded-lg bg-primary/5"></div>}
              </div>
              <div className="flex flex-col">
                <p className="max-w-[350px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-primary-full-dark group-hover:text-primary-dark">
                  {product.name}
                </p>
                <p className="max-w-[350px] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-600">
                  {product.description}
                </p>
              </div>
            </td>
            <td className="px2 text-left">
              {product.status === "Active" && (
                <button className="rounded-xl bg-primary px-2 py-1 text-xs text-white">Activo</button>
              )}
              {product.status === "Inactive" && (
                <button className="rounded-xl bg-[hsla(353,100%,35%,1)] px-[10px] py-[2px] text-xs text-white">
                  Inactivo
                </button>
              )}
              {product.status === "Archived" && (
                <button className="rounded-xl bg-slate-500 px-[10px] py-[2px] text-xs text-white duration-200 hover:bg-slate-600">
                  Archivado
                </button>
              )}
            </td>
            <td className="px-2 text-left">
              <span className="text-sm">
                {currencyFormat({ value: product.price, currency: business.business_currency })}
              </span>
            </td>
            <td className="px-2">
              <div className="flex justify-end space-x-4">
                <Link
                  href={`${createBusinessURL(business)}/products/${product.path}`}
                  target="_blank"
                  className="text-slate-600 duration-200 hover:scale-110 hover:text-slate-700">
                  <IoEye size={18} />
                </Link>
                <Link
                  href={`products/${product.path}`}
                  className="text-slate-600 duration-200 hover:scale-110 hover:text-slate-700">
                  <IoOpenOutline size={18} />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
