// File: order/src/repositories/orderRepository.js
const Order = require("../models/order");

class OrderRepository {
    async create(orderData) {
        const order = new Order(orderData);
        await order.save();
        return order;
    }
}

module.exports = OrderRepository;