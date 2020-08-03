import React from "react";

const Category = (props) => {
  const { name } = props;

  return (
    <div className="col-lg-6 mb-4">
      <div className="card bg-info text-white shadow">
        <div className="card-body">{name}</div>
      </div>
    </div>
  );
};

export default Category;
