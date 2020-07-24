import React from "react";
import Title from "./Title";
import ProductData from "./ProductData";
import ProductAmount from "./ProductAmount";
import UsersQuantity from "./UsersQuantity";
import LastProduct from "./LastProduct";

export default function Dashboard() {
  return (
    <div className="container-fluid">
      <Title />
      <div class="row">
        <ProductData />
        <ProductAmount />
        <UsersQuantity />
      </div>
      <div class="row">
        <div class="col-lg-6 mb-4">
          <LastProduct />
        </div>
      </div>
    </div>
  );
}
