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