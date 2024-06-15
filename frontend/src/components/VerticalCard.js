import React, { useContext } from "react";
import scrollTop from "../helpers/scrollTop";
import displayINR from "../helpers/displayCurrency";
import Context from "../context";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);

  const { getCartCount } = useContext(Context);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    getCartCount();
  };

  return (
    <div>
      {/** original code 3 card in a row */}
      {/* <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,300px))] justify-between md:gap-6 overflow-x-scroll scrollbar-hiden transition-all">
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
                <Link
                  to={"/product/" + item?._id}
                  className="w-full min-w-[290px]  md:min-w-[300px] max-w-[290px] md:max-w-[300px]  rounded-sm shadow bg-white "
                  onClick={scrollTop}
                >
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
                    <button
                      onClick={(e) => handleAddToCart(e, item?._id)}
                      className="bg-red-500 hover:bg-red-600 px-3 py-0.5 text-white mt-2"
                    >
                      Add To Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div> */}

      {/** gpt code 5 card in a row */}
      {/* <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-between md:gap-6 overflow-x-scroll scrollbar-hidden transition-all">
        {loading
          ? loadingList?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full min-w-[200px] md:min-w-[240px] max-w-[200px] md:max-w-[240px] rounded-sm shadow bg-white animate-pulse"
                >
                  <div className="bg-slate-200 p-4 h-48 min-w-[200px] md:min-w-[120px] flex justify-center items-center cursor-pointer animate-pulse"></div>
                  <div className="p-3 grid gap-2">
                    <h2 className="p-1 bg-slate-200 rounded-full py-2 animate-pulse"></h2>
                    <p className="p-1 bg-slate-200 rounded-full py-2 animate-pulse"></p>
                    <div className="flex gap-3">
                      <p className="p-1 bg-slate-200 rounded-full w-full py-2 animate-pulse"></p>
                      <p className="p-1 bg-slate-200 rounded-full w-full py-2 animate-pulse"></p>
                    </div>
                    <button className="px-3 p-1 bg-slate-200 rounded-full py-2 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data?.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={"/product/" + item?._id}
                  className="w-full min-w-[200px] md:min-w-[240px] max-w-[200px] md:max-w-[240px] rounded-sm shadow bg-white"
                  onClick={scrollTop}
                >
                  <div className="bg-slate-200 p-4 h-48 min-w-[200px] md:min-w-[120px] flex justify-center items-center cursor-pointer">
                    <img
                      src={item?.productImage[0]}
                      className="h-full w-full object-scale-down hover:scale-110 transition-all mix-blend-multiply"
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
                    <button
                      onClick={(e) => handleAddToCart(e, item?._id)}
                      className="bg-red-500 hover:bg-red-600 px-3 py-0.5 text-white mt-2"
                    >
                      Add To Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div> */}

      {/** gpt code 4 card in a row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-scroll scrollbar-hidden transition-all">
        {loading
          ? loadingList?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full rounded-sm shadow bg-white animate-pulse"
                >
                  <div className="bg-slate-200 p-4 h-48 flex justify-center items-center cursor-pointer animate-pulse"></div>
                  <div className="p-3 grid gap-2">
                    <h2 className="p-1 bg-slate-200 rounded-full py-2 animate-pulse"></h2>
                    <p className="p-1 bg-slate-200 rounded-full py-2 animate-pulse"></p>
                    <div className="flex gap-3">
                      <p className="p-1 bg-slate-200 rounded-full w-full py-2 animate-pulse"></p>
                      <p className="p-1 bg-slate-200 rounded-full w-full py-2 animate-pulse"></p>
                    </div>
                    <button className="px-3 p-1 bg-slate-200 rounded-full py-2 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data?.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={"/product/" + item?._id}
                  className="w-full rounded-sm shadow bg-white"
                  onClick={scrollTop}
                >
                  <div className="bg-slate-200 p-4 h-48 flex justify-center items-center cursor-pointer">
                    <img
                      src={item?.productImage[0]}
                      className="h-full w-full object-scale-down hover:scale-110 transition-all mix-blend-multiply"
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
                    <button
                      onClick={(e) => handleAddToCart(e, item?._id)}
                      className="bg-red-500 hover:bg-red-600 px-3 py-0.5 text-white mt-2"
                    >
                      Add To Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default VerticalCard;
