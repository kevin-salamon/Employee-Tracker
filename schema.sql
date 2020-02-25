DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;

USE employeesDB;

CREATE TABLE employees (
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(30) NOT NULL,
  manager_id INTEGER(30),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INTEGER(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE departments (
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO employees (first_name, last_name, role_id) values ('Test', 'Test', 1);
INSERT INTO roles (title, salary, department_id) values ('test title', 100000, 2);
INSERT INTO department_id (name) values ('test department');

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;