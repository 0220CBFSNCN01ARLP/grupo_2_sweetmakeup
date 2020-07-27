import React from "react";
import Title from "./Title";
import ProductData from "./ProductData";
import ProductAmount from "./ProductAmount";
import UsersQuantity from "./UsersQuantity";
import LastProduct from "./LastProduct";
import Categories from "./Categories";
import Footer from "./Footer";

export default function Dashboard() {
  return (
    <div className="container-fluid">
      <Title />
      <div className="row">
        <ProductData />
        <ProductAmount />
        <UsersQuantity />
      </div>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <LastProduct />
        </div>
        <Categories />
      </div>
      
    </div>
    
  );
}
