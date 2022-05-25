CREATE TABLE Orders(
    id  SERIAL PRIMARY KEY,
 user_id INTEGER REFERENCES Users(id),
 status VARCHAR(20)
);