import React from "react";

import MainCarousel from "./MainCarousel";
import ShopingList from "./ShopingList";
import Subscribe from "./Subscribe";
import ScrollTopButton from "../../components/ScrollTop";

function Home() {
  return (
    <div>
      <MainCarousel />
      <ScrollTopButton/>
      <ShopingList />
      <Subscribe />
    </div>
  );
}

export default Home;
