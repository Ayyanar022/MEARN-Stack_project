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
    setCategoryList(resProductList.data);
    setLoading(false);
  };

  useEffect(() => {
    productCategory();
  }, []);

  return (
    <div className="w-full mx-auto container   p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-hiden">
        {loading
          ? categoryLoading.map((el, i) => {
              return (
                <div
                  className="h-18 w-18 md:h-20 md:w-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                  key={"category" + i}
                ></div>
              );
            })
          : categoryList?.map((product, index) => (
              <Link
                to={"/product-category/" + product?.category}
                className="cursor-pointer"
              >
                <div className=" h-18 w-18 md:h-20 md:w-20 rounded-full overflow-hidden p-4 bg-slate-200  flex items-center justify-center">
                  <img
                    src={product?.productImage[0]}
                    alt={product.category}
                    className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all "
                  />
                </div>
                <p className="text-center text-sm md:text-base capitalize">
                  {product?.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;
