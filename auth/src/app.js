// File: auth/src/app.js
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config"); // Dùng config/index.js để lấy biến môi trường
const AuthController = require("./controllers/authController");
// const authMiddleware = require("./middlewares/authMiddleware"); // Dòng này có thể giữ nếu bạn cần dashboard

class App {
    constructor() {
        this.app = express();
        this.authController = new AuthController();
        this.connectDB();
        this.setMiddlewares();
        this.setRoutes();
    }

    async connectDB() {
        try {
            // mongoose.connect không cần options cũ nữa
            await mongoose.connect(config.mongoURI);
            console.log("Auth Service: MongoDB connected successfully!");
        } catch (err) {
            console.error("Auth Service: MongoDB connection error:", err.message);
            process.exit(1);
        }
    }

    setMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    setRoutes() {
        const router = express.Router();
        // Dùng router để code sạch hơn
        router.post("/register", (req, res) => this.authController.register(req, res));
        router.post("/login", (req, res) => this.authController.login(req, res));

        // Thêm tiền tố /auth cho tất cả các route của service này
        this.app.use('/auth', router);
    }

    start() {
        const PORT = process.env.PORT || 3000;
        this.app.listen(PORT, () => console.log(`Auth service started on port ${PORT}`));
    }
}

module.exports = App;