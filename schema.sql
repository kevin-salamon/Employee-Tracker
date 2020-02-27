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
  id INTEGER(10) NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INTEGER(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE departments (
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO employees (first_name, last_name, role_id, manager_id) values ('Kevin', 'Salamon', 1, 1);
INSERT INTO roles (id, title, salary, department_id) values (1, 'Engineer', 100000, 1);
INSERT INTO departments (department_name) values ('Software');

INSERT INTO employees (first_name, last_name, role_id, manager_id) values ('Hope', 'Brandes', 2, 1);
INSERT INTO roles (id, title, salary, department_id) values (2, 'Designer', 100000, 1);

INSERT INTO employees (first_name, last_name, role_id) values ('Joe', 'Salamon', 3);
INSERT INTO roles (id, title, salary, department_id) values (3, 'Manager', 200000, 2);
INSERT INTO departments (department_name) values ('Executive');

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;
