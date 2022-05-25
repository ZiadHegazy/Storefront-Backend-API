CREATE TABLE Order_Product(
    order_id INT REFERENCES Orders(id),
    product_id int REFERENCES Products(id),
    product_quantity int,
    PRIMARY KEY(order_id,product_id)
);