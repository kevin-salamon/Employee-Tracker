const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "employeesDB"
});
  
connection.connect(function(err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
  inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
        "Add a Department, Role, or Employee",
        "View a Department, Role, or Employee",
        "Update Employee roles",
        "Exit"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "Add a Department, Role, or Employee":
        addInfo();
        break;

        case "View a Department, Role, or Employee":
        viewTables();
        break;

        case "Update Employee roles":
        updateInfo();
        break;

        case "Exit":
        break;
        }

    });
}

function addInfo() {
    inquirer
      .prompt({
          name: "action",
          type: "rawlist",
          message: "What would you like to add?",
          choices: [
          "Add a Department",
          "Add a Role",
          "Add an Employee"
          ]
      })
      .then(function(answer) {
        switch (answer.action) {
          case "Add a Department":
            inquirer.prompt(
                {
                    name: "name",
                    message: "Please input the name of the new department:",
                    type: "input",
                }
            ).then(function(answer) {
                var query = "INSERT INTO departments (department_name) values (?)";
                connection.query(query, answer.name, function(err, res) {
                    console.log("New department added!");
                    runSearch();
                });
            });
  
          case "Add a Role":
            inquirer.prompt([
                {
                    name: "title",
                    message: "Please input the title of the new role:",
                    type: "input",
                },
                {
                    name: "salary",
                    message: "Enter the salary for the new role:",
                    type: "input",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                          return true;
                        }
                        return false;
                      }
                },
                {
                    name: "department_id",
                    message: "What is the department ID for the new role?:",
                    type: "input",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                          return true;
                        }
                        return false;
                      }
                }
            ]).then(function(answer) {
                var query = "INSERT INTO roles (title, salary, department_id) values (?, ?, ?)";
                connection.query(query, [answer.title, answer.salary, answer.department_id], function(err, res) {
                    console.log("New role added!");
                    runSearch();
                });
            });
  
          case "Add an Employee":
            inquirer.prompt([
                {
                    name: "first_name",
                    message: "Please input the first name of the new employee:",
                    type: "input",
                },
                {
                    name: "last_name",
                    message: "Enter the last name for the new employeee:",
                    type: "input",
                },
                {
                    name: "role_id",
                    message: "What is the role ID for the new employee?:",
                    type: "input",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                          return true;
                        }
                        return false;
                      }
                },
                {
                    name: "manager_id",
                    message: "What is the manager ID for the new employee?:",
                    type: "input",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                          return true;
                        }
                        return false;
                      }
                }
            ]).then(function(answer) {
                var query = "INSERT INTO employees (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)";
                connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], function(err, res) {
                    console.log("New employee added!");
                    runSearch();
                });
            });
        }
      });
}

function viewTables() {
  inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
        "View an Employee",
        "View a Department",
        "View a Role",
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "View an Employee":
        // code here

        break;

        case "View a Department":
        // code here

        break;

        case "View a Role":
        //code here

        break;
        }
    });
}

// updateInfo();