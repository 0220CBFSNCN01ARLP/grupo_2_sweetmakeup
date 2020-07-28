import React from "react";
import PageHeader from "./PageHeader";
import InfoCard from "../InfoCard";
import LastProduct from "./LastProduct";
import CategoriesList from "./CategoriesList";

const contentDashboard = [
  {
    colorClass: "primary",
    icon: "fa-clipboard-list",
    title: "Product in data base",
    number: "135",
  },
  {
    colorClass: "success",
    icon: "fa-dollar-sign",
    title: "Amount in products",
    number: "$546.456",
  },
  {
    colorClass: "warning",
    icon: "fa-user-check",
    title: "users quantity",
    number: "38",
  },
];

const PageContent = (props) => {
  return (
    <div className="container-fluid">
      <PageHeader />
      <div className="row">
        {contentDashboard.map((item, i) => (
          <InfoCard
            key={"item" + i}
            colorClass={item.colorClass}
            icon={item.icon}
            title={item.title}
            number={item.number}
          />
        ))}
      </div>
      <div className="row">
        <LastProduct />
        <CategoriesList />
      </div>
    </div>
  );
};

export default PageContent;
