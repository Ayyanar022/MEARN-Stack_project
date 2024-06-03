import React, { useEffect, useState } from "react";
import SummaryApi from "../common";

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

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
  console.log("categoryList", categoryList);
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-hiden">
        {categoryList?.map((product, index) => (
          <div className="cursor-pointer">
            <div className=" h-18 w-18 md:h-20 md:w-20 rounded-full overflow-hidden p-3 bg-white  flex items-center justify-center">
              <img
                src={product?.productImage[0]}
                alt={product.category}
                className="h-full object-contain"
              />
            </div>
            <p className="text-center text-sm md:text-base capitalize">
              {product?.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
