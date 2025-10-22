// File: order/src/app.js
const express = require("express");
const mongoose = require("mongoose");
const OrderController = require('./controllers/orderController'); // Dùng controller ta vừa tạo

class App {
    constructor() {
        this.app = express();
        this.orderController = new OrderController();

        this.connectDB();
        this.setMiddlewares();
        this.setRoutes();
    }

    async connectDB() {
        try {
            // Kết nối tới DB riêng của service order
            await mongoose.connect(process.env.MONGODB_ORDER_URI);
            console.log("Order Service: MongoDB connected successfully!");
        } catch (err) {
            console.error("Order Service: MongoDB connection error:", err.message);
            process.exit(1);
        }
    }

    setMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    setRoutes() {
        const router = express.Router();

        // Chỉ cần một route duy nhất để tạo đơn hàng
        router.post('/', (req, res) => this.orderController.createOrder(req, res));

        // Gắn router vào với tiền tố /orders
        this.app.use('/orders', router);
    }

    start() {
        // Lấy PORT từ biến môi trường của Docker, mặc định là 3002
        const PORT = process.env.PORT || 3002;
        this.app.listen(PORT, () => console.log(`Order service started on port ${PORT}`));
    }
}

module.exports = App;