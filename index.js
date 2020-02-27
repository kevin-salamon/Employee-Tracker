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
        "View Departments, Roles, or Employees",
        "Update Employee Roles or Manager",
        "Delete an Employee, Department, or Role",
        "View Department Budget",
        "View Employees by Manager",
        "Exit"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "Add a Department, Role, or Employee":
        addInfo();
        break;

        case "View Departments, Roles, or Employees":
        viewTables();
        break;

        case "Update Employee Roles or Manager":
        updateInfo();
        break;

        case "Delete an Employee, Department, or Role":
        deleteInfo()
        break;

        case "View Department Budget":
        viewBudget();
        break;

        case "View Employees by Manager":
        viewByManager();
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
          type: "list",
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
                connection.query(query, [answer.name], function(err, res) {
                    console.log("New department added!");
                    runSearch();
                });
            });
            break;
  
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
                    name: "role_id",
                    message: "Enter the ID for the new role:",
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
                var query = "INSERT INTO roles (id, title, salary, department_id) values (?, ?, ?, ?)";
                connection.query(query, [answer.role_id, answer.title, answer.salary, answer.department_id], function(err, res) {
                    console.log("New role added!");
                    runSearch();
                });
            });
            break;
  
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
            break;
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
        "View Employees",
        "View Departments",
        "View Roles"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "View Employees":
            var query = "SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, departments.department_name ";
            query+= "FROM employees ";
            query+= "LEFT JOIN roles ON role_id = roles.id ";
            query+= "LEFT JOIN departments ON department_id = departments.id ";
            query+= "ORDER BY employees.id";
            connection.query(query, function(err, res) {
                console.table(res);
                console.log("----------------");
                runSearch();
            });
        break;

        case "View Departments":
          var query = "SELECT departments.id, departments.department_name ";
          query+= "FROM departments ";
          query+= "ORDER BY departments.id";
          connection.query(query, function(err, res) {
              console.table(res);
              console.log("----------------");
              runSearch();
          });
        break;

        case "View Roles":
          var query = "SELECT roles.id, roles.title, roles.salary, departments.department_name ";
          query+= "FROM roles ";
          query+= "LEFT JOIN departments ON department_id = departments.id "
          query+= "ORDER BY roles.id";
          console.log(query);
          connection.query(query, function(err, res) {
              console.table(res);
              console.log("----------------");
              runSearch();
          });
        break;
        }
    });
}

function updateInfo() {
  inquirer
  .prompt({
      name: "action",
      type: "list",
      message: "Do you want to update an employee role, or manager?",
      choices: [
      "Update Role",
      "Update Manager"
      ]
  }).then(function(answer) {
    switch (answer.action) {
      case "Update Role":
        inquirer
        .prompt([
          {
            name: "employeeID",
            type: "input",
            message: "What is the ID of the employee you would like to update?",
          },
          {
            name: "roleID",
            type: "input",
            message: "What is the ID of the role you would like to assign to the employee?",
          }
        ]).then(function(answer) {
          let employee = answer.employeeID;
          let role = answer.roleID;
          var query = "UPDATE employees SET role_id = ? WHERE employees.id = ?";
            connection.query(query, [role, employee], function(err, res) {
                console.table(res.message);
                console.log("Role Updated!");
                console.log("----------------");
                runSearch();
            });
        });
        break;

      case "Update Manager":
        inquirer
        .prompt([
          {
            name: "employeeID",
            type: "input",
            message: "What is the ID of the employee you would like to update?",
          },
          {
            name: "managerID",
            type: "input",
            message: "What is the ID of the manager you would like to assign to the employee?",
          }
        ]).then(function(answer) {
          let employee = answer.employeeID;
          let manager = answer.managerID;
          var query = "UPDATE employees SET manager_id = ? WHERE employees.id = ?";
            connection.query(query, [manager, employee], function(err, res) {
                console.table(res.message);
                console.log("Manager Updated!");
                console.log("----------------");
                runSearch();
            });
        });
        break;
    }
  });
}

function deleteInfo() {
  inquirer
  .prompt({
      name: "action",
      type: "list",
      message: "Do you want to delete an employee, role, or department?",
      choices: [
      "Delete Employee",
      "Delete Role",
      "Delete Department"
      ]
  }).then(function(answer) {
    switch (answer.action) {
      case "Delete Employee":
        inquirer
        .prompt(
          {
            name: "employeeID",
            type: "input",
            message: "What is the ID of the employee you would like to delete?",
          }
        ).then(function(answer) {
          var query = "DELETE FROM employees WHERE id = ?";
            connection.query(query, [answer.employeeID], function(err, res) {
                console.table(res.message);
                console.log("Employee Deleted!");
                console.log("----------------");
                runSearch();
            });
        });
        break;

      case "Delete Role":
        inquirer
        .prompt(
          {
            name: "roleID",
            type: "input",
            message: "What is the ID of the role you would like to delete?",
          }
        ).then(function(answer) {
          var query = "DELETE FROM roles WHERE id = ?";
            connection.query(query, [answer.roleID], function(err, res) {
                console.table(res.message);
                console.log("Role Deleted!");
                console.log("----------------");
                runSearch();
            });
        });
        break;

      case "Delete Department":
        inquirer
        .prompt(
          {
            name: "departmentID",
            type: "input",
            message: "What is the ID of the department you would like to delete?",
          }
        ).then(function(answer) {
          var query = "DELETE FROM departments WHERE id = ?";
            connection.query(query, [answer.departmentID], function(err, res) {
                console.table(res.message);
                console.log("Department Deleted!");
                console.log("----------------");
                runSearch();
            });
        });
        break;
    }
  });
}

function viewBudget() {
  inquirer
  .prompt({
      name: "departmentID",
      type: "input",
      message: "Please list the department ID for which you would like to see the budget:",
  }).then(function(answer) {
    var query = "SELECT SUM(salary) FROM roles WHERE department_id = ?";
    connection.query(query, answer.departmentID, function(err, res) {
        console.log("Please see the below total budget for the selected department. All amounts are in US dollars.")
        console.log(res[0]);
        console.log("----------------");
        runSearch();
    });
  });
}

function viewByManager() {
  inquirer
    .prompt({
        name: "managerID",
        type: "input",
        message: "Input the manager ID for which whose employees you would like to view:",
    })
    .then(function(answer) {
      var query = "SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id ";
      query+= "FROM employees WHERE manager_id = ?";
      connection.query(query, answer.managerID, function(err, res) {
        console.table(res);
        console.log("----------------");
        runSearch();
    });
  });
}