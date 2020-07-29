import React from "react";
import Product from "../Product";

const LastProduct = () => {
    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                        Last product in Database
                    </h6>
                </div>
                <Product />
            </div>
        </div>
    );
};

export default LastProduct;
