import React, { Component } from "react";
import PageHeader from "./PageHeader";
import InfoCard from "../InfoCard";
import LastProduct from "./LastProduct";
import CategoriesList from "./CategoriesList";

async function getProducts() {
  const getResult = await fetch("http://localhost:3000/api/products");
  const productsResult = await getResult.json();
  return productsResult.products;
}

async function getUsers() {
  const getResult = await fetch("http://localhost:3000/api/users");
  const usersResult = await getResult.json();
  return usersResult;
}

const calculatePrice = function (products) {
  let prices = products.map((product) => {
    return Number(product.price);
  });
  let total = 0;
  for (let i = 0; i < prices.length; i++) {
      total += prices[i]
    }
  return total.toFixed(2);
};

class PageContent extends Component {
  state = { products: [], users: [], totalPrice: 0 };

  async updateState() {
    console.log("updating state");
    const products = await getProducts();
    this.setState({ products });
    const totalPrice = calculatePrice(products);
    this.setState({totalPrice});
    const users = await getUsers();
    this.setState({ users });
  }

  componentDidMount() {
    this.updateState();
  }

  

  render() {
    const productsCount = this.state.products.length;
    const usersCount = this.state.users.length;
    const totalPrice = this.state.totalPrice;

    return (
      <div className="container-fluid">
        <PageHeader />
        <div className="row">
          <InfoCard
            key={"item 1"}
            colorClass="primary"
            icon="fa-clipboard-list"
            title="Product in data base"
            number={productsCount}
          />
          <InfoCard
            key={"item 2"}
            colorClass="success"
            icon="fa-dollar-sign"
            title="Amount in products"
            number={totalPrice}
          />
          <InfoCard
            key={"item 3"}
            colorClass="warning"
            icon="fa-user-check"
            title="users quantity"
            number={usersCount}
          />
        </div>
        <div className="row">
          <LastProduct />
          <CategoriesList />
        </div>
      </div>
    );
  }
}

export default PageContent;
