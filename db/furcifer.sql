DROP DATABASE IF EXISTS furcifer;
CREATE DATABASE IF NOT EXISTS furcifer;
USE furcifer;

CREATE TABLE restaurant (
    restaurant_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    distance float not null,
    image VARCHAR(255) NOT NULL,
    PRIMARY KEY (restaurant_id)
);

CREATE TABLE food (
    food_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    restaurant_id INT NOT NULL,
    price FLOAT NOT NULL, 
    image varchar(255) DEFAULT NULL,
    PRIMARY KEY (food_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id)
);

CREATE TABLE food_tag (
    food_id INT NOT NULL,
    tag VARCHAR(50) NOT NULL,
    PRIMARY KEY (food_id, tag)
);

CREATE TABLE user (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    vegetarian_only TINYINT DEFAULT 0,
    halal_only TINYINT DEFAULT 0,
    hypertensive TINYINT DEFAULT 0,
    budget_only TINYINT DEFAULT 0,
    age INT NOT NULL,
    gender TINYINT,
    PRIMARY KEY (user_id)
);

CREATE TABLE user_order (
    order_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    order_datetime DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (order_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id)
);

CREATE TABLE order_food (
    order_id INT NOT NULL,
    food_id INT NOT NULL,
    quantity INT DEFAULT 1,
    PRIMARY KEY (order_id, food_id),
    FOREIGN KEY (order_id) REFERENCES user_order(order_id),
    FOREIGN KEY (food_id) REFERENCES food(food_id)
);