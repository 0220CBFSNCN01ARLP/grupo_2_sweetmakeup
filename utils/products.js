const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");

function getProducts() {
    return JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
}

module.exports = {
    getProducts,
    productsFilePath
};