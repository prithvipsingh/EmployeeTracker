DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT,
first_name VARCHAR (40),
last_name VARCHAR (40),
role_id INTEGER(10),
manager_id INTEGER(10) NULL,
PRIMARY KEY(id)
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL (30.2),
  department_id INTEGER (10),
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jason", "Mark", 1, 2), ("Mohit", "Singh", 2, 1), ("Stacy", "Carter", 3, 2);
INSERT into employee (first_name, last_name, role_id)
values ("John", "Stamos", 3); 
INSERT into employee (first_name, last_name, role_id)
values ("Jim", "Baker", 4);
INSERT into employee (first_name, last_name, role_id)
values ("George", "Washington", 5);
INSERT into employee (first_name, last_name, role_id)
values ("Meghan", "Kelly", 6);
INSERT into employee (first_name, last_name, role_id)
values ("Tom", "Hanks", 7);
INSERT into employee (first_name, last_name, role_id)
values ("Dolly", "Parton", 8);


INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 200, 1), ("Engineer", 100, 2), ("Intern", 10, 2);
INSERT into role (title, salary, department_id)
VALUES ("Sales Lead", 45000, 1);
INSERT into role (title, salary, department_id)
VALUES ("Salesperson", 35000, 1);
INSERT into role (title, salary, department_id)
VALUES ("Lead Engineer", 43000, 2);
INSERT into role (title, salary, department_id)
VALUES ("Accountant", 50000, 3);
INSERT into role (title, salary, department_id)
VALUES ("Legal", 50000, 4);
INSERT into role (title, salary, department_id)
VALUES ("Manager", 65000, 5);


INSERT INTO department (name)
VALUES ("Admin"), ("Engineering"), ("Education");
INSERT into department (name)
VALUES ("Sales");
INSERT into department (name)
VALUES ("Engineering");
INSERT into department (name)
VALUES ("Finance");
INSERT into department (name)
VALUES ("Legal");
INSERT into department (name)
VALUES ("Manager");

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;