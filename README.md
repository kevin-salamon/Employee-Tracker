# Employee-Tracker

## Project Description 

An application using Node.js and SQL/mySQL to track and manage a company database containing all information about employees, company roles, and departments.

## Table of Contents 

1. Installations & Dependencies 

2. Usage 

3. Additional Contributors 

4. Licensing 

5. Testing

## Installations and Dependencies 

1. Inquirer module - for prompting of the user in the CLI
2. mySQL module - connects to the given database through the CLI and allows node connection

## Usage 

> This program runs through the CLI with node.js, and allows the constructions of a mySQL database through the given command prompts. To start the program, run index.js as the server within node (typically inputting 'node index.js' in your CLI of choice while within the correct directory). Users may then choose from among the following choices to add, edit, remove, and view data within the database:
1. "Add a Department, Role, or Employee": Will additionally prompt the user to specify which area (department, role, employee) they would like to add to. Answer the questions in the following prompts to add the new data to the database.
2. "View Departments, Roles, or Employees": User can then specify further as to which area they would like to view, after which the CLI will return a table containing all data about that area from the database.
3. "Update Employee Roles or Manager": Will ask to specify whether to update role or manager, after which it will request the id of the employee to update and either the role id or manager id to change to from the current respective role id or manager id of the employee.
4. "Delete an Employee, Department, or Role": User can then specify further as to which area they would like to delete from, after which they will be prompted for the specific id to delete (i.e. if department and id=1 is chosen, then the first department ("Software") will be deleted).
5. "View Department Budget": Requests a department id, after which the program will return the total salary of all employees within that department.
6. "View Employees by Manager": Will prompt the user for an ID of a specific manager, after which it will return all employees under that manager.
7. "Exit": Will close the program.


## Additional Contributors 

> N/A

## License 

* N/A

## Testing 

> N/A
