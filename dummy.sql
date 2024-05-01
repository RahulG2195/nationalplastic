CREATE TABLE order_list (
    razorpay_order_id VARCHAR(100) PRIMARY KEY,
    customer_id INT,
    order_mobile VARCHAR(20),
    order_address VARCHAR(255),
    order_pincode VARCHAR(10),
    order_city VARCHAR(100),
    order_payment_type VARCHAR(50),
    payment_status VARCHAR(50),
    razor_payment_id VARCHAR(100),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (customer_id),
    INDEX (payment_status),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE order_detail (
    razorpay_order_id VARCHAR(100) PRIMARY KEY,
    customer_id INT,
    product_id INT,
    product_name VARCHAR(255),
    product_price DECIMAL(10, 2),
    order_cancel BOOLEAN DEFAULT 0,
    order_return BOOLEAN DEFAULT 0,
    order_cancel_msg TEXT,
    INDEX (razorpay_order_id),
    INDEX (customer_id),
    FOREIGN KEY (razorpay_order_id) REFERENCES order_list(razorpay_order_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
