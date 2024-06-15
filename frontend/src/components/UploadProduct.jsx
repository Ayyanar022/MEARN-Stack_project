import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri"; // close icon
import { MdFileUpload } from "react-icons/md"; // upload icon
import { MdDelete } from "react-icons/md"; // delete icon
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayBigImage from "./DisplayBigImage";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose ,fetchProduct}) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const handleCancel = () => {
    setData({
      productName: "",
      brandName: "",
      category: "",
      productImage: [],
      description: "",
      price: "",
      sellingPrice: "",
    });
  };

  const handleOnChnage = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [openfullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleUploadProductImage = async (e) => {
    const file = e.target.files[0];
    const uploadCloudinaryImage = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadCloudinaryImage.url],
      };
    });
  };

  // to remove image from  array
  const deleteProductImage = (index) => {

    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  // submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      handleCancel();
      onClose();
      fetchProduct()
    }

    if (responseData.error) {
      toast.error(responseData.message);
      handleCancel();
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 left-0 top-0 bottom-0 right-0 flex justify-center items-center ">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden ">
        <div className="flex justify-center items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-xl hover:text-red-500 cursor-pointer"
            onClick={onClose}
          >
            <RiCloseFill />
          </div>
        </div>

        <form className="grid p-4 gap-1 overflow-y-scroll h-full pb-9 ">
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
            required
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
            required
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
            required
          >
            <option value={""}>Select Category</option>

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
            {data?.productImage[0] ? (
              <div className="flex  gap-4 ">
                {data?.productImage?.map((image, index) => (
                  <div className="relative  group">
                    <img
                      src={image}
                      key={index}
                      width={90}
                      height={90}
                      className="bg-slate-100 rounded border cursor-pointer  "
                      alt="product"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(image);
                      }}
                    />

                    <div
                      onClick={() => deleteProductImage(index)}
                      className="absolute top-0 right-0  bg-red-500 rounded-full p-1 hidden  group-hover:block cursor-pointer"
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-500 text-xs p-3">
                Please Upload Product Image
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-2 cursor-pointer">
            Price :
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter Price"
            value={data.price}
            onChange={handleOnChnage}
            className="p-2 border bg-slate-100 outline-none rounded"
            required
          />

          <label htmlFor="sellingPrice" className="mt-2 cursor-pointer">
            SellingPrice :
          </label>
          <input
            type="number"
            name="sellingPrice"
            id="sellingPrice"
            placeholder="Enter SellingPrice"
            value={data.sellingPrice}
            onChange={handleOnChnage}
            className="p-2 border bg-slate-100 outline-none rounded"
            required
          />

          <label htmlFor="description" className="mt-2 cursor-pointer">
            Description :
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Enter Description"
            value={data.description}
            onChange={handleOnChnage}
            className="p-2 border bg-slate-100 outline-none rounded h-20 resize-none"
            required
            rows={3}
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className="px-3 py-1 bg-red-500 rounded text-white mb-4 font-semibold hover:bg-red-600 transition-all"
          >
            Upload Product
          </button>
        </form>
      </div>
      {/**Display full screen image  */}
      {openfullScreenImage && (
        <DisplayBigImage
          imageUrl={fullScreenImage}
          onClose={() => setOpenFullScreenImage(false)}
        />
      )}
    </div>
  );
};

export default UploadProduct;
