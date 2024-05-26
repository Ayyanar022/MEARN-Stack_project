import React, { useState } from "react";
import UploadProduct from "../components/UploadProduct";

const Products = () => {
  const [openUpload, setOpenUpload] = useState(false);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          onClick={() => setOpenUpload((prev) => !prev)}
          className=" text-black transition-all hover:border-red-500 rounded-full hover:bg-white hover:text-red-500 border-2  px-2 py-1 font-semibold text-sm"
        >
          Upload Product
        </button>
      </div>
      {openUpload && <UploadProduct onClose={() => setOpenUpload(false)} />}
    </div>
  );
};

export default Products;
