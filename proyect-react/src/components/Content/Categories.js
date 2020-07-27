import React from "react";
import Category1 from "./Category1";
import Category2 from "./Category2";
import Category3 from "./Category3";
import Category4 from "./Category4";
import Category5 from "./Category5";
import Category6 from "./Category6";

export default function Categories() {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
        </div>
        <div className="card-body">
          <div className="row">
            <Category1 />
            <Category2 />
            <Category3 />
            <Category4 />
            <Category5 />
            <Category6 />
          </div>
        </div>
      </div>
    </div>

  );
}
