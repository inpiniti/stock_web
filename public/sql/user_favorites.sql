CREATE TABLE user_favorites (
    user_id INT PRIMARY KEY,
    favorite_stocks JSON NOT NULL
);