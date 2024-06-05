import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const productCategory = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productCategoryDistinct.url);
    const resProductList = await response.json();
    console.log("list", resProductList.data);
    setCategoryList(resProductList.data);
    setLoading(false);
  };

  useEffect(() => {
    productCategory();
  }, []);

  return (
    // <div className="w-full mx-auto container   p-4">
    //   <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-hiden">
    //     {loading
    //       ? categoryLoading.map((el, i) => {
    //           return (
    //             <div
    //               className="h-18 w-18 md:h-20 md:w-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
    //               key={"category" + i}
    //             ></div>
    //           );
    //         })
    //       : categoryList?.map((product, index) => (
    //           <Link
    //             to={"/product-category/" + product?.category}
    //             className="cursor-pointer"
    //           >
    //             <div className=" h-18 w-18 md:h-20 md:w-20 rounded-full overflow-hidden p-4 bg-slate-200  flex items-center justify-center">
    //               <img
    //                 src={product?.productImage[0]}
    //                 alt={product.category}
    //                 className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all "
    //               />
    //             </div>
    //             <p className="text-center text-sm md:text-base capitalize">
    //               {product?.category}
    //             </p>
    //           </Link>
    //         ))}
    //   </div>
    // </div>

    //-------------------------------------------------------------------------

    // <div className="w-full mx-auto container p-4">
    //   <div className="flex items-center gap-4 justify-between overflow-x-auto scrollbar-hidden scrollbar-hiden">
    //     {loading
    //       ? categoryLoading.map((el, i) => (
    //           <div
    //             key={"category" + i}
    //             className="h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden bg-slate-200 animate-pulse flex-shrink-0"
    //           ></div>
    //         ))
    //       : categoryList?.map((product, index) => (
    //           <Link
    //             key={index}
    //             to={"/product-category/" + product?.category}
    //             className="cursor-pointer flex-shrink-0"
    //           >
    //             <div className="h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden p-2 bg-slate-200 flex items-center justify-center">
    //               <img
    //                 src={product?.productImage[0]}
    //                 alt={product.category}
    //                 className="h-full w-full object-scale-down mix-blend-multiply hover:scale-125 transition-transform duration-200 ease-in-out"
    //               />
    //             </div>
    //             <p className="text-center text-xs md:text-sm capitalize">
    //               {product?.category}
    //             </p>
    //           </Link>
    //         ))}
    //   </div>
    // </div>

    <div className="w-full mx-auto container p-4">
      <div className="flex items-center gap-4 justify-between overflow-x-auto scrollbar-hiden">
        {loading
          ? categoryLoading.map((el, i) => (
              <div
                key={"category" + i}
                className="h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden bg-slate-200 animate-pulse flex-shrink-0"
              ></div>
            ))
          : categoryList?.map((product, index) => (
              <Link
                key={index}
                to={"/product-category/" + product?.category}
                className="cursor-pointer flex-shrink-0"
              >
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden p-2 bg-slate-200 flex items-center justify-center">
                  <img
                    src={product?.productImage[0]}
                    alt={product.category}
                    className="h-full w-full object-scale-down mix-blend-multiply transform hover:scale-110 transition-transform duration-200 ease-in-out"
                  />
                </div>
                <p className="text-center text-xs md:text-sm capitalize">
                  {product?.category}
                </p>
              </Link>
            ))}
      </div>
    </div>

    //----------------------------------------------------------------------
  );
};

export default CategoryList;
