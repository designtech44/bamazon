DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE Products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(7,2) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);
INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Drill", "Power tools", 65.99, 100);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Hammer Drill", "Power tools", 99.99, 40);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Circular Saw", "Power tools", 89.9, 10);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Jig Saw", "Power tools", 39.99, 25);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("Hammer", "tools", 19.99, 40);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("screw driver set", "tools", 29.9, 100);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("block sander", "sunndies", 3.99, 70);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("pole", "hand tools", 79.99, 50);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("drop cloth", "paint supply", 29.99, 100);

INSERT INTO Products (product_name, department_name, price, stock_quantity)
VALUES ("paint brush", "paint tools", 14.99, 40);

select * from Products; 
