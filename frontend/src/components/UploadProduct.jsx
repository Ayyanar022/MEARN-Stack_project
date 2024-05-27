import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri"; // close icon
import { MdFileUpload } from "react-icons/md"; // upload icon
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";

const UploadProduct = ({ onClose }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const handleOnChnage = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [uploadProductImageInput, setUploadProductImageInput] = useState("");

  const handleUploadProductImage = async (e) => {
    const file = e.target.files[0];
    setUploadProductImageInput(file?.name);

    const uploadCloudinaryImage = await uploadImage(file);
    console.log("uploadCloudinary", uploadCloudinaryImage.url);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadCloudinaryImage.url],
      };
    });
  };
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 left-0 top-0 bottom-0 right-0 flex justify-center items-center ">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden ">
        <div className="flex justify-center items-center pb-3">
          <h2 className="font-bold text-lg">UploadProduct</h2>
          <div
            className="w-fit ml-auto text-xl hover:text-red-500 cursor-pointer"
            onClick={onClose}
          >
            <RiCloseFill />
          </div>
        </div>

        <form className="grid p-4 gap-1 overflow-y-scroll h-full pb-4 ">
          <label htmlFor="productName" className="cursor-pointer">
            Product Name :
          </label>
          <input
            type="text"
            name="productName"
            id="productName"
            placeholder="Enter product Name "
            value={data.productName}
            onChange={handleOnChnage}
            className="p-2 border bg-slate-100 outline-none rounded"
          />

          <label htmlFor="brandName" className="mt-2 cursor-pointer">
            Brand Name :
          </label>
          <input
            type="text"
            name="brandName"
            id="brandName"
            placeholder="Enter product Name "
            value={data.brandName}
            onChange={handleOnChnage}
            className="p-2 border bg-slate-100 outline-none rounded"
          />

          <label htmlFor="category" className="mt-2">
            category :
          </label>
          <select
            type="text"
            name="category"
            id="category"
            placeholder="select Category Name"
            value={data.category}
            onChange={handleOnChnage}
            className="p-2 border bg-slate-100 outline-none rounded"
          >
            {productCategory.map((el, index) => (
              <option value={el.value} key={index}>
                {el.label}
              </option>
            ))}
          </select>

          <label htmlFor="productImage" className="mt-2">
            Product Image :
          </label>
          <label htmlFor="uploadProductImage" className="cursor-pointer">
            <div className=" p-2 border bg-slate-100 outline-none rounded h-20 flex justify-center items-center">
              <div className="flex justify-center items-center flex-col ">
                <span className="text-2xl ">
                  <MdFileUpload />
                </span>
                <p>Upload Product Image</p>
              </div>

              <input
                type="file"
                id="uploadProductImage"
                className="hidden"
                onChange={handleUploadProductImage}
              />
            </div>
          </label>
          <div>
            {data?.productImage ? (
              data?.productImage?.map((iamge, index) => (
                <img
                  src={iamge}
                  key={index}
                  width={80}
                  height={80}
                  className="bg-slate-100 rounded "
                  alt="product"
                />
              ))
            ) : (
              <p>Please Upload Product Image</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
