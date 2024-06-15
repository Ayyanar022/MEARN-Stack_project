import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import { useState } from "react";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";

const CategoryProduct = () => {
  const params = useParams();

  // params.categoryName
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListarray = urlSearch.getAll("category");
  const urlCategoryObject = {};
  urlCategoryListarray.forEach((el) => {
    urlCategoryObject[el] = true;
  });
  const [selctCategory, setSelectCategory] = useState(urlCategoryObject);
  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    const response = await fetch(SummaryApi?.filterProduct?.url, {
      method: SummaryApi?.filterProduct?.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        filterList: filterCategoryList,
      }),
    });
    const dataresponse = await response.json();
    setData(dataresponse?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    const arrayOfCategory = Object.keys(selctCategory)
      .map((catKeyName) => {
        if (selctCategory[catKeyName]) {
          return catKeyName;
        } else {
          return null;
        }
      })
      .filter((el) => el);
    setFilterCategoryList(arrayOfCategory);

    // format for url change { it will change all selected product dinamically in url}
    const urlFormat = arrayOfCategory?.map((el, i) => {
      if (arrayOfCategory?.length - 1 === i) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    // it for add item i url when we click checkbox
    navigate("/product-category?" + urlFormat.join(""));
  }, [selctCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
    if (value === "asc") {
      setData((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === "dsc") {
      setData((prev) => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };
 
  useEffect(() => {}, [sortBy]);

  return (
    <div className="container mx-auto p-4">
      {/**desktop version */}
      <div className=" hidden lg:grid grid-cols-[200px,1fr]">
        {/**left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/**sort by  price*/}
          <div className="">
            <h2 className="text-base border-b border-slate-300 uppercase font-medium pb-1 text-slate-500">
              Sort by
            </h2>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className=" flex items-center gap-3">
                <input
                  type="radio"
                  name="sort"
                  value={"asc"}
                  id="price-low-high "
                  className="cursor-pointer"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price Low - High</label>
              </div>

              <div className=" flex items-center gap-3">
                <input
                  type="radio"
                  name="sort"
                  value={"dsc"}
                  id="price-high-low"
                  className="cursor-pointer"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                />
                <label htmlFor="">Price High - Low</label>
              </div>
            </form>
          </div>

          {/**filter by Category */}
          <div className="">
            <h2 className="text-base border-b border-slate-300 uppercase font-medium pb-1 text-slate-500">
              Category
            </h2>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory?.map((el, index) => (
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="category"
                    id={el?.value}
                    value={el?.value}
                    checked={selctCategory[el?.value]}
                    onChange={handleSelectCategory}
                  />
                  <label htmlfor={el?.value}>{el?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/**right side */}
        <div className="px-4">
          <h2 className="font-medium text-slate-800 text-lg py-2">
            Search Result : {data?.length}
          </h2>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {data?.length !== 0 && (
              <VerticalCard loading={loading} data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
