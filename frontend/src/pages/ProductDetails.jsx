import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { useParams } from "react-router-dom";
import { IoMdStar } from "react-icons/io"; // star icon
import { IoMdStarHalf } from "react-icons/io"; // half start icon
import displayINR from "../helpers/displayCurrency";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [loading, setLoading] = useState(false);
  const loadingImageList = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const params = useParams();

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi?.getProductDetails?.url, {
      method: SummaryApi?.getProductDetails?.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        peoductId: params?.id,
      }),
    });

    const resData = await response.json();
    setData(resData?.data);
    setActiveImage(resData?.data?.productImage[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMouseEnterImage = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="   min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/**product IMAGE */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4 ">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200">
            <img
              src={activeImage}
              className="h-fill w-full object-scale-down mix-blend-multiply"
            />
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col animate-pulse overflow-scroll scrollbar-hiden h-full ">
                {loadingImageList?.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="h-20 w-20 bg-slate-200 rounded"
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-hiden h-full ">
                {data?.productImage?.map((imageUrl, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 p-1 rounded cursor-pointer "
                      key={index}
                    >
                      <img
                        src={imageUrl}
                        onMouseEnter={() => handleMouseEnterImage(imageUrl)}
                        onClick={() => handleMouseEnterImage(imageUrl)}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/**product DETAILS */}
        {loading ? (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2  w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium ">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-500">{data?.category}</p>
            <div className="flex gap-1 text-red-500 items-center">
              <IoMdStar />
              <IoMdStar />
              <IoMdStar />
              <IoMdStar />
              <IoMdStarHalf />
            </div>

            <div className="flex items-center text-2xl gap-2 font-medium my-1 lg:text-3xl">
              <p className="text-red-500">{displayINR(data?.sellingPrice)}</p>
              <p className="text-slate-500 line-through">
                {displayINR(data?.price)}
              </p>
            </div>

            <div className="flex gap-3 items-center my-2">
              <button className="border-2 py-1 min-w-[120px] hover:bg-red-500 hover:text-white transition-all text-red-600 border-red-500 px-3 font-medium rounded ">
                Buy
              </button>
              <button className="border-2 py-1 min-w-[120px] border-red-500 px-3 font-medium rounded text-white bg-red-500 hover:bg-white hover:text-red-600 transition-all  ">
                Add To Cart
              </button>
            </div>
            <div>
              <p className="font-medium text-slate-600 text-lg">
                Description :
              </p>
              <p className="">{data?.description}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2  w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium ">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-500">{data?.category}</p>
            <div className="flex gap-1 text-red-500 items-center">
              <IoMdStar />
              <IoMdStar />
              <IoMdStar />
              <IoMdStar />
              <IoMdStarHalf />
            </div>

            <div className="flex items-center text-2xl gap-2 font-medium my-1 lg:text-3xl">
              <p className="text-red-500">{displayINR(data?.sellingPrice)}</p>
              <p className="text-slate-500 line-through">
                {displayINR(data?.price)}
              </p>
            </div>

            <div className="flex gap-3 items-center my-2">
              <button className="border-2 py-1 min-w-[120px] hover:bg-red-500 hover:text-white transition-all text-red-600 border-red-500 px-3 font-medium rounded ">
                Buy
              </button>
              <button className="border-2 py-1 min-w-[120px] border-red-500 px-3 font-medium rounded text-white bg-red-500 hover:bg-white hover:text-red-600 transition-all  ">
                Add To Cart
              </button>
            </div>
            <div>
              <p className="font-medium text-slate-600 text-lg">
                Description :
              </p>
              <p className="">{data?.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
