import React, { useState } from "react";
import { MdEdit } from "react-icons/md"; //edit icon
import AdminEditCard from "./AdminEditCard";
import displayINR from "../helpers/displayCurrency";

const AdminProductCard = ({ product, key, fetchProduct }) => {
  const [editCardOpen, setEditCardOpen] = useState(false);
  return (
    <div className="bg-white rounded p-4">
      <div className="w-36">
        <div className="w-32 h-32 flex justify-center items-center ">
          <img
            src={product.productImage[0]}
            alt="img"
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <h2 className="text-ellipsis text-sm line-clamp-2 pt-2">
          {product.productName}
        </h2>

        <div>
          <p className="font-semibold text-red-700 line-through pt-1">
            {displayINR(product.price)}
          </p>
          <p className="font-semibold text-green-800  text-sm">
            {displayINR(product.sellingPrice)}
          </p>
          <div
            onClick={() => setEditCardOpen(true)}
            className="w-fit ml-auto bg-red-200 p-1   hover:bg-red-400 cursor-pointer rounded-full shadow  hover:text-white"
          >
            <MdEdit />
          </div>
        </div>
      </div>

      {editCardOpen && (
        <AdminEditCard
          fetchProduct={fetchProduct}
          product={product}
          onClose={() => {
            setEditCardOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
