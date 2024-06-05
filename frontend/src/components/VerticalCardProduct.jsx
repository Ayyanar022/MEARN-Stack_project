import React, { useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINR from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const loadingList = new Array(13).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setData(categoryProduct?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap44 md:gap-6 overflow-x-scroll scrollbar-hiden transition-all"
        ref={scrollElement}
      >
        <button
          onClick={scrollLeft}
          className="text-xl z-10 bg-slate-100 rounded-full cursor-pointer shadow-md hover:bg-white hidden md:block   ml-4 hover:scale-125 transition-all absolute left-0 "
        >
          <FaAngleLeft />
        </button>

        <button
          onClick={scrollRight}
          className="text-xl z-10 bg-slate-100 rounded-full cursor-pointer shadow-md hidden md:block  hover:bg-white mr-4 hover:scale-125 transition-all absolute right-0 "
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList?.map((item, index) => {
              return (
                <div className="w-full min-w-[290px]  md:min-w-[330px] max-w-[290px] md:max-w-[330px]  rounded-sm shadow bg-white  animate-pulse">
                  <div className=" bg-slate-200 p-4 h-48 min-w-[280px] md:min-w-[145px] flex justify-center items-center cursor-pointer animate-pulse "></div>
                  <div className="p-3 grid gap-2">
                    <h2 className="p-1 bg-slate-200 rounded-full py-2  animate-pulse"></h2>
                    <p className="p-1 bg-slate-200 rounded-full py-2  animate-pulse"></p>
                    <div className="flex gap-3">
                      <p className="p-1 bg-slate-200 rounded-full w-full py-2 animate-pulse"></p>
                      <p className="p-1 bg-slate-200 rounded-full w-full py-2 animate-pulse"></p>
                    </div>
                    <button className=" px-3  p-1 bg-slate-200 rounded-full py-2 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data?.map((item, index) => {
              return (
                <div className="w-full min-w-[290px]  md:min-w-[330px] max-w-[290px] md:max-w-[330px]  rounded-sm shadow bg-white ">
                  <div className=" bg-slate-200 p-4 h-48 min-w-[280px] md:min-w-[145px] flex justify-center items-center cursor-pointer ">
                    <img
                      src={item?.productImage[0]}
                      className="h-full w-full object-scale-down hover:scale-110 transition-all mix-blend-multiply "
                    />
                  </div>
                  <div className="p-3 grid gap-2">
                    <h2 className="font-medium md:text-lg text-base text-ellipsis line-clamp-1">
                      {item?.productName}
                    </h2>
                    <p className="capitalize text-slate-600">
                      {item?.category}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium">
                        {displayINR(item?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayINR(item?.price)}
                      </p>
                    </div>
                    <button className="bg-red-500 hover:bg-red-600 px-3 py-0.5 text-white mt-2">
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
