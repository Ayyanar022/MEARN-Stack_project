import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context/index";
import displayINR from "../helpers/displayCurrency";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const lodingData = new Array(context.cartCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.getCartProductView.url, {
      method: SummaryApi.getCartProductView.method,
      credentials: "include",
    });

    const resData = await response.json();
    if (resData.success) {
      setData(resData.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("data--", data);

  return (
    <div className="container mx-auto">
      <div className="text-center my-4 font-light text-lg ">
        {data.length === 0 && !loading && <p>Cart is empty..!!</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/**view product */}
        <div className="w-full max-w-3xl ">
          {loading
            ? lodingData.map((el, index) => {
                return (
                  <div
                    key={index}
                    className="w-full h-32 my-3 bg-slate-200 border border-slate-300 animate-pulse"
                  ></div>
                );
              })
            : Array.isArray(data) &&
              data.map((pro, index) => {
                return (
                  <div
                    key={index}
                    className="w-full h-32 my-3 bg-white border border-slate-300 grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={pro?.productId?.productImage[0]}
                        alt="img"
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="py-2 px-4">
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {pro?.productId?.productName}
                      </h2>
                      <p className="text-slate-500 capitalize">
                        {pro?.productId?.category}
                      </p>
                      <p className="text-red-500 font-medium">
                        {displayINR(pro?.productId?.sellingPrice)}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <button className="border border-red-500 text-red-500 w-6 h-6 flex justify-center items-center cursor-pointer transition-all hover:bg-red-500 hover:text-white">
                          -
                        </button>
                        <spam>{pro?.quantity}</spam>
                        <button className=" border border-red-500 text-red-500 w-6 h-6 flex justify-center items-center cursor-pointer transition-all  hover:bg-red-500 hover:text-white">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        {/**summary of all product  */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse ">
              Total
            </div>
          ) : (
            <div className="h-36 bg-slate-200">Total</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
