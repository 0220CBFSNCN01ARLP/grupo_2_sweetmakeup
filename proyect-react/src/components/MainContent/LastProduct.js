import React, { Component } from "react";
import Product from "../Product";

async function getProduct() {
    const getResult = await fetch("http://localhost:3000/api/products");
    const productsResult = await getResult.json();
    const data = productsResult.products;
    const lastProduct = await fetch(`http://localhost:3000/api/products/30`)
    return lastProduct
}

class LastProduct extends Component {
    state = { name: "pepe", price: 0, description: "", images: [] }
    async updateState() {
        const lastProduct = await getProduct();

        let image = "https://via.placeholder.com/500"

        // if (lastProduct.images.length>0) {
        //    image = lastProduct.images[0].route
        //} 
        this.setState({ name: lastProduct.name, price: lastProduct.price, description: lastProduct.description, image: image });
        
    }
    componentDidMount() {
        this.updateState();
    }

    render() {
        let name = this.state.name
        let price = this.state.price
        let description = this.state.description
        let image = this.state.image

        return (
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                            Last product in Database
                    </h6>
                    </div>
                    <Product
                        name={name}
                        price={price}
                        description={description}
                        image={image}

                    />
                </div>
            </div>
        );

    };
};
export default LastProduct;
