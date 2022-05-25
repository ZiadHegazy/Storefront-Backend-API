# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index  >>>>>>>     API endpoint:  (get)  localhost:3000/products
- Show (args: product id)   >>>>>>>>>>>    API endpoint: (get) localhost:3000/products/:product_id
- Create (args: Product)[token required] >>>>>>>>>>API endpoint: (post) localhost:3000/products
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] >>>>>>>   API endpoint:  (get)  localhost:3000/users
- Show (args: id)[token required] >>>>>>>  API endpoint:  (get)  localhost:3000/users/:user_id
- Create (args: User)[token required]>>>>>>>>> API endpoint: (post) localhost:3000/users

#### Orders
- Current Order by user (args: user id)[token required] >>>>> API endpoint:  (get)  localhost:3000/orders/:user_id 
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

- schema of Product

CREATE TABLE Products(
    id SERIAL PRIMARY KEY,
name VARCHAR(30),
price INTEGER,
category VARCHAR(30)
);


#### User
- id
- firstName
- lastName
- password
- schema of User 

CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
 firstName VARCHAR(20),
 lastName VARCHAR(20),
 password VARCHAR(20)
);

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

- Schema of Orders
CREATE TABLE Orders(
    id  SERIAL PRIMARY KEY,
 user_id INTEGER REFERENCES Users(id),
 status VARCHAR(20)
);

- Schema of the relation between orders and products
CREATE TABLE Order_Product(
    order_id INT REFERENCES Orders(id),
    product_id int REFERENCES Products(id),
    product_quantity int,
    PRIMARY KEY(order_id,product_id)
);