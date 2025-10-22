# Hệ thống Thương mại Điện tử Microservices

## Giới thiệu

Đây là một dự án mô phỏng hệ thống thương mại điện tử cơ bản, được xây dựng theo kiến trúc Microservices. Dự án bao gồm các dịch vụ độc lập để xử lý các nghiệp vụ khác nhau như xác thực người dùng, quản lý sản phẩm và đặt hàng. Toàn bộ hệ thống được đóng gói và vận hành bằng Docker.

---

## Kiến trúc Hệ thống

Dự án được phân chia thành các dịch vụ độc lập, mỗi dịch vụ đảm nhiệm một chức năng nghiệp vụ cụ thể:

* **API Gateway (`api-gateway`)**: Là điểm truy cập duy nhất (Single Point of Entry) cho tất cả các yêu cầu từ client. Dịch vụ này chịu trách nhiệm định tuyến các yêu cầu đến dịch vụ nội bộ tương ứng.

* **Dịch vụ Xác thực (`auth-service`)**: Xử lý toàn bộ logic liên quan đến xác thực và ủy quyền, bao gồm đăng ký, đăng nhập và cấp phát JSON Web Token (JWT).

* **Dịch vụ Sản phẩm (`product-service`)**: Quản lý các hoạt động liên quan đến sản phẩm như tạo mới và truy vấn thông tin sản phẩm.

* **Dịch vụ Đơn hàng (`order-service`)**: Chịu trách nhiệm xử lý các nghiệp vụ liên quan đến việc tạo và quản lý đơn hàng.

Các dịch vụ giao tiếp với nhau qua mạng nội bộ do Docker tạo ra và sử dụng cơ sở dữ liệu MongoDB.

---

## Hướng dẫn Cài đặt và Khởi chạy

### Yêu cầu

* Docker và Docker Compose đã được cài đặt trên hệ thống.

### Khởi chạy

1.  Clone repository này về máy tính.
2.  Mở một cửa sổ dòng lệnh (Terminal hoặc PowerShell) tại thư mục gốc của dự án.
3.  Thực thi lệnh sau để build các image và khởi động toàn bộ container:

    ```bash
    docker-compose up --build
    ```

Hệ thống sẽ khởi chạy thành công khi log từ các dịch vụ hiển thị thông báo đã kết nối tới cơ sở dữ liệu và đang lắng nghe trên các cổng được chỉ định.

---

## Kiểm thử API với Postman

Sau khi hệ thống đã khởi chạy, các API có thể được kiểm thử thông qua API Gateway tại địa chỉ `http://localhost:8088`.

#### 1. Đăng ký tài khoản

* **Method**: `POST`
* **URL**: `http://localhost:8088/auth/register`
* **Body** (`raw`, JSON):
    ```json
    {
        "username": "testuser",
        "password": "password123"
    }
    ```

#### 2. Đăng nhập và lấy Token

* **Method**: `POST`
* **URL**: `http://localhost:8088/auth/login`
* **Body** (`raw`, JSON):
    ```json
    {
        "username": "testuser",
        "password": "password123"
    }
    ```
* **Lưu ý**: Sao chép giá trị `accessToken` từ kết quả trả về để sử dụng cho các yêu cầu cần xác thực.

#### 3. Tạo sản phẩm mới

* **Method**: `POST`
* **URL**: `http://localhost:8088/products`
* **Authorization**: Chọn `Bearer Token` và dán `accessToken` đã sao chép.
* **Body** (`raw`, JSON):
    ```json
    {
        "name": "Macbook Pro M4",
        "price": 50000000,
        "description": "Chip sieu cap vip pro"
    }
    ```
* **Lưu ý**: Sao chép giá trị `_id` của sản phẩm vừa được tạo.

#### 4. Tạo đơn hàng

* **Method**: `POST`
* **URL**: `http://localhost:8088/orders`
* **Authorization**: Sử dụng `Bearer Token` tương tự như trên.
* **Body** (`raw`, JSON):
    ```json
    {
        "products": ["<ID_SẢN_PHẨM_VỪA_SAO_CHÉP>"],
        "totalPrice": 50000000
    }
    ```

---

## Công nghệ sử dụng

* **Backend**: Node.js, Express.js
* **Database**: MongoDB, Mongoose
* **Kiến trúc**: Microservices, API Gateway
* **Containerization**: Docker, Docker Compose
* **Xác thực**: JSON Web Token (JWT)
