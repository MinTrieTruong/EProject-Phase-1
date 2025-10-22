// File: src/services/productsService.js
const ProductsRepository = require("../repositories/productsRepository"); // Sửa lại đường dẫn

class ProductsService {
    constructor() {
        this.productsRepository = new ProductsRepository();
    }

    async createProduct(product) {
        return await this.productsRepository.create(product);
    }

    async getProducts() {
        return await this.productsRepository.findAll();
    }
}

module.exports = ProductsService;