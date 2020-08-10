import React from "react";
const Product = (props) => {
  const { name, id, price, description, image } = props;
  return (
    <div className="card-body">
      <div className="text-center">
        <img
          className="img-fluid px-3 px-sm-4 mt-3 mb-4"
          style={{ width: "25rem" }}
          src={image}
          alt="image dummy"
        />
      </div>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{price}</p>
      <a
        target="_blank"
        rel="nofollow"
        href={`http://localhost:3000/products/${id}`}
      >
        View product detail
      </a>
    </div>
  );
};

export default Product;
