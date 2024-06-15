import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context/index";
import displayINR from "../helpers/displayCurrency";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const lodingData = new Array(context.cartCount).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.getCartProductView.url, {
      method: SummaryApi.getCartProductView.method,
      credentials: "include",
    });

    const resData = await response.json();
    if (resData.success) {
      setData(resData.data);
    }
  };

  const handleLoading = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };

  useEffect(() => {
    handleLoading();
  }, []);

  const increaseQty = async (id, qty, e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.updateCartCount.url, {
      method: SummaryApi.updateCartCount.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        quantity: qty + 1,
        _id: id,
      }),
    });
    const resData = await response.json();
    if (resData.success) {
      fetchData();
    }
  };

  const decreseQty = async (id, qty, e) => {
    e.preventDefault();
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartCount.url, {
        method: SummaryApi.updateCartCount.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          quantity: qty - 1,
          _id: id,
        }),
      });
      const resData = await response.json();
      if (resData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.delteCartItem.url, {
      method: SummaryApi.delteCartItem.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // Corrected header name
      },
      body: JSON.stringify({ _id: id }), // Ensure body is correctly formatted
    });
    const resData = await response.json();
    if (resData.success) {
      fetchData();
      context.getCartCount();
    }
  };

  // counting total quantity
  const countOfQunatity = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue?.quantity,
    0
  );

  const totalPrice = data.reduce(
    (prev, curr) => prev + curr?.quantity * curr?.productId?.sellingPrice,
    0
  );

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
                    <div className="py-2 px-4 relative">
                      {/** delete product */}
                      <div
                        onClick={() => deleteCartProduct(pro?._id)}
                        className="absolute p-2 hover:text-red-500 text-lg cursor-pointer right-0"
                      >
                        <MdOutlineDeleteOutline />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {pro?.productId?.productName}
                      </h2>
                      <p className="text-slate-500 capitalize">
                        {pro?.productId?.category}
                      </p>
                      <div className="flex items-center justify-between ">
                        <p className="text-red-500 font-medium ">
                          {displayINR(pro?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-500 font-semibold ">
                          {displayINR(
                            pro?.productId?.sellingPrice * pro?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          onClick={(e) =>
                            decreseQty(pro?._id, pro?.quantity, e)
                          }
                          className="border border-red-500 text-red-500 w-6 h-6 flex justify-center items-center cursor-pointer transition-all hover:bg-red-500 hover:text-white"
                        >
                          -
                        </button>
                        <spam>{pro?.quantity}</spam>
                        <button
                          onClick={(e) =>
                            increaseQty(pro?._id, pro?.quantity, e)
                          }
                          className=" border border-red-500 text-red-500 w-6 h-6 flex justify-center items-center cursor-pointer transition-all  hover:bg-red-500 hover:text-white"
                        >
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
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse "></div>
          ) : (
            <div className="h-36 bg-white flex flex-col justify-between">
              <div>
                <h2 className="text-white bg-red-500 px-4 py-1 ">Summary</h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Quantity</p>
                  <p>{countOfQunatity}</p>
                </div>

                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Total Price</p>
                  <p>{displayINR(totalPrice)}</p>
                </div>
              </div>
              <button className="bg-slate-200 w-full p-1 hover:bg-green-300 font-medium">
                Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
