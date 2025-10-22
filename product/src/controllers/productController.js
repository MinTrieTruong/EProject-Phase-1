// File: src/controllers/productController.js
const ProductsService = require('../services/productsService');

class ProductController {
    constructor() {
        this.productsService = new ProductsService();
    }

    // Hàm tạo sản phẩm mới
    async createProduct(req, res) {
        try {
            // Logic xác thực token nên để ở gateway hoặc middleware, nhưng tạm chấp nhận ở đây cho bài thi
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const product = await this.productsService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Hàm lấy tất cả sản phẩm
    async getProducts(req, res) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const products = await this.productsService.getProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    }
}

module.exports = ProductController;