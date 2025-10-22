// File: order/src/services/orderService.js
const OrderRepository = require("../repositories/orderRepository");

class OrderService {
    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async createOrder(orderData) {
        // Trong tương lai có thể thêm các logic phức tạp ở đây (vd: kiểm tra tồn kho)
        // Nhưng cho bài thi, chỉ cần gọi repository là đủ.
        return await this.orderRepository.create(orderData);
    }
}

module.exports = OrderService;