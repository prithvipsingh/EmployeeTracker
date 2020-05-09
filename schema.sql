DROP DATABASE IF EXISTS emlyoees_DB;


CREATE DATABASE emlyoees_DB;


USE emlyoees_DB;



CREATE TABLE employees (
id INTEGER AUTO_INCREMENT,
first_name VARCHAR (40),
last_name VARCHAR (40),
role_id INTEGER(10),
manager_id INTEGER(10) NULL,
PRIMARY KEY(id)

);
CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL (30.2),
  department_id INTEGER (10),
  PRIMARY KEY (id)
);
CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jason", "Mark", 1, 2), ("Mohit", "Singh", 2, 1), ("Stacy", "Carter", 3, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 200, 1), ("Engineer", 100, 2), ("Intern", 10, 2);

INSERT INTO department (name)
VALUES ("Admin"), ("Engineering"), ("Education");