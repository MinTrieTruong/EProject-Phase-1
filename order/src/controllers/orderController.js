// File: order/src/controllers/orderController.js
const OrderService = require('../services/orderService');

class OrderController {
    constructor() {
        this.orderService = new OrderService();
    }

    async createOrder(req, res) {
        try {
            // Logic xác thực token nên để ở gateway, ta chỉ kiểm tra sự tồn tại của nó
            if (!req.headers.authorization) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const { products, totalPrice } = req.body;
            if (!products || !totalPrice) {
                return res.status(400).json({ message: 'Products and totalPrice are required' });
            }

            const newOrder = await this.orderService.createOrder({ products, totalPrice });
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = OrderController;