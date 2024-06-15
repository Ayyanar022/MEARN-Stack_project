import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common/index.js";
// import VerticalCard from "../components/VerticalCard.js";

const SearchProductPage = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchProductFun = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.searchProduct.url + query.search);
      const resData = await response.json();
      console.log("resData", resData.data);
      setData(resData.data);
      setLoading(false);
    } catch (err) {
      console.log("error", err.message);
    }
  };

  useEffect(() => {
    searchProductFun();
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading....</p>}

      <p className="text-lg font-semibold mt-2 mb-3">
        Avilable Product Result : {data.length}
      </p>

      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">
          No Product Avilable. . . .
        </p>
      )}

      {data.length !== 0 && !loading && (
        // <VerticalCard data={data} loading={loading} />
        <h1></h1>
      )}
    </div>
  );
};

export default SearchProductPage;
