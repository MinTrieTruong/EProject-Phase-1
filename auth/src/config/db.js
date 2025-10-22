// File: src/config/db.js
const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        // process.env.MONGODB_AUTH_URI sẽ lấy chuỗi kết nối từ file .env
        await mongoose.connect(process.env.MONGODB_AUTH_URI);
        console.log('Auth Service: MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Thoát khỏi tiến trình nếu không thể kết nối
        process.exit(1);
    }
};

module.exports = connectDB;