import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
// import axios from "axios";

const Products = () => {
  const [openUpload, setOpenUpload] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await fetch(SummaryApi.getAllProducts.url);
      const dataResponse = await response.json();
      setAllProducts(dataResponse?.data || []);

      console.log("getdata", dataResponse.data);
    } catch (error) {
      console.log("Error fetching all products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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

      {/**show All Products */}
      <div className="flex gap-5 flex-wrap p-5 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProducts &&
          allProducts?.map((product, index) => (
            <AdminProductCard
              product={product}
              key={index}
              fetchProduct={getAllProducts}
            />
          ))}
      </div>

      {/**Upload product details */}

      {openUpload && (
        <UploadProduct
          onClose={() => setOpenUpload(false)}
          fetchProduct={getAllProducts}
        />
      )}
    </div>
  );
};

export default Products;
