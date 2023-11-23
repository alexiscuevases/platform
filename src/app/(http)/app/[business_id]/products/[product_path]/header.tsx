"use client";

import { BusinessApiResponseInterface, ProductApiResponseInterface } from "interfaces";
import { useState } from "react";
import { IoCreateOutline, IoDuplicateOutline } from "react-icons/io5";
import ProductModal from "../../../_components/modals/product";

interface Props {
  business: BusinessApiResponseInterface;
  product: ProductApiResponseInterface;
}

export default function Header({ business, product }: Props) {
  const [isOpen, setOpened] = useState(false);
  const [modal, setModal] = useState<any>({
    action: "update",
    product
  });

  return (
    <div className="flex justify-between">
      <h1 className="text-xl font-bold">{product.names["Default"]}</h1>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => {
            setOpened(true);
            setModal({ ...modal, action: "update" });
          }}
          className="button button-secondary flex items-center space-x-2">
          <IoCreateOutline size={22} />
          <span>Editar</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setOpened(true);
            setModal({ ...modal, action: "duplicate" });
          }}
          className="button button-primary flex items-center space-x-2">
          <IoDuplicateOutline size={22} />
          <span>Duplicar</span>
        </button>
      </div>
      <ProductModal
        isOpen={isOpen}
        setOpened={setOpened}
        action={modal.action}
        product={modal.product}
        business={business}
      />
    </div>
  );
}
