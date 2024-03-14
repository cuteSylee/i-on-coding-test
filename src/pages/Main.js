import React from "react";
import Slider from "../components/Slider";
import Notice from "../components/Notice";
import Products from "../components/Products";
import Footer from "../components/Footer";

// 메인화면
const Main = () => {
  return (
    <>
      <Slider />
      <Notice />
      <Products />
      <Footer />
    </>
  );
};

export default Main;
