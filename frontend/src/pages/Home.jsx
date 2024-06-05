import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpods"} />
      <HorizontalCardProduct
        category={"earphones"}
        heading={"Top's Earphone"}
      />

      <VerticalCardProduct category={"tv"} heading={"Televisions"} />
      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct category={"watches"} heading={"smart Watches"} />
      <VerticalCardProduct category={"camera"} heading={"Camera"} />
      <VerticalCardProduct category={"mouse"} heading={"Mouse"} />
      <VerticalCardProduct category={"speakers"} heading={"Speakers"} />
      <VerticalCardProduct
        category={"refrigerator"}
        heading={"Refrigerators"}
      />
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
    </div>
  );
};

export default Home;
