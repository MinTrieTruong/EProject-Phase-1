// File: product/src/app.js (PHIÊN BẢN CÓ "CAMERA GIẤU KÍN")
const express = require("express");
const mongoose = require("mongoose");
const ProductController = require('./controllers/productController');

class App {
    constructor() {
        this.app = express();
        this.productController = new ProductController();

        this.connectDB();
        this.setMiddlewares();
        this.setRoutes();
    }

    async connectDB() {
        try {
            await mongoose.connect(process.env.MONGODB_PRODUCT_URI);
            console.log("Product Service: MongoDB connected successfully!");
        } catch (err) {
            console.error("Product Service: MongoDB connection error:", err.message);
            process.exit(1);
        }
    }

    setMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    setRoutes() {
        this.app.post('/products', (req, res) => this.productController.createProduct(req, res));
        this.app.get('/products', (req, res) => this.productController.getProducts(req, res));

        // ================= CAMERA GIẤU KÍN =================
        // Route này sẽ bắt tất cả các request không khớp ở trên
        this.app.use('*', (req, res) => {
            console.log(`[CAMERA] Phat hien request lạ: Method=${req.method}, URL=${req.originalUrl}`);
            res.status(404).send(`[CAMERA] Route khong ton tai: ${req.method} ${req.originalUrl}`);
        });
        // ===================================================
    }

    start() {
        const PORT = process.env.PORT || 3001;
        this.app.listen(PORT, () => console.log(`Product service started on port ${PORT}`));
    }
}

module.exports = App;