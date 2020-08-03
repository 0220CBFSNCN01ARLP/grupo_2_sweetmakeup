import React, { Component } from "react";
import Category from "../Category";

async function getCategories() {
  const getResult = await fetch("http://localhost:3000/api/categories");
  const categoryResult = await getResult.json();
  return categoryResult;
}

class CategoriesList extends Component {
  state = { categories: [] };

  async updateState() {
    const categories = await getCategories();
    this.setState({
      categories,
    });
    console.log(categories);
  }
  componentDidMount() {
    this.updateState();
  }

  render() {
    let categories = this.state.categories;

    return (
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Categories in Database
            </h6>
          </div>
          <div className="card-body">
            <div className="row">
              {categories.map((e, i) => {
                return <Category key={i + 1} name={e.name} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoriesList;
