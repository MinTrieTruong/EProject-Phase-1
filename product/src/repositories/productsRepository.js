// File: src/repositories/productsRepository.js
const Product = require("../models/product"); // Dùng model đã có

class ProductsRepository {
    async create(productData) {
        const product = new Product(productData);
        await product.save();
        return product;
    }

    async findAll() {
        return await Product.find({});
    }
}

module.exports = ProductsRepository;