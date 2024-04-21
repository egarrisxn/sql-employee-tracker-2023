// Purpose: Main entry point for the application

// Import required modules
import inquirer from "inquirer";
import mysql from "mysql2";

// Encryption for env file
import dotenv from "dotenv";
dotenv.config();

// Dotenv variables
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPw = process.env.DB_PW;
const dbName = process.env.DB_NAME;

// Mysql2 database connection
const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPw,
  database: dbName,
});

function MainPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Employees",
            value: "VIEW_ALL_EMPLOYEES",
          },
          {
            name: "View All Roles",
            value: "VIEW_ALL_ROLES",
          },
          {
            name: "View All Departments",
            value: "VIEW_ALL_DEPARTMENTS",
          },
          {
            name: "Add Employees",
            value: "ADD_EMPLOYEES",
          },
          {
            name: "Remove Employees",
            value: "REMOVE_EMPLOYEES",
          },
          {
            name: "Add Roles",
            value: "ADD_ROLES",
          },
          {
            name: "Remove Roles",
            value: "REMOVE_ROLES",
          },
          {
            name: "Add Departments",
            value: "ADD_DEPARTMENTS",
          },
          {
            name: "Remove Departments",
            value: "REMOVE_DEPARTMENTS",
          },
          {
            name: "View Employees By Roles",
            value: "VIEW_EMPLOYEES_BY_ROLES",
          },
          {
            name: "Update Employees Roles",
            value: "UPDATE_EMPLOYEES_ROLES",
          },
          {
            name: "View Employees By Departments",
            value: "VIEW_EMPLOYEES_BY_DEPARTMENTS",
          },
          {
            name: "Update Employees Departments",
            value: "UPDATE_EMPLOYEES_DEPARTMENTS",
          },
          {
            name: "Exit Application",
            value: "EXIT_APPLICATION",
          },
        ],
      },
    ])
    .then(function ({ choices }) {
      switch (choices) {
        case "VIEW_ALL_EMPLOYEES":
          viewAllEmployees();
          break;
        case "VIEW_ALL_ROLES":
          viewAllRoles();
          break;
        case "VIEW_ALL_DEPARTMENTS":
          viewAllDepartments();
          break;
        case "ADD_EMPLOYEES":
          addEmployees();
          break;
        case "REMOVE_EMPLOYEES":
          removeEmployees();
          break;
        case "ADD_ROLES":
          addRoles();
          break;
        case "REMOVE_ROLES":
          removeRoles();
          break;
        case "ADD_DEPARTMENTS":
          addDepartments();
          break;
        case "REMOVE_DEPARTMENTS":
          removeDepartments();
          break;
        case "VIEW_EMPLOYEES_BY_ROLES":
          viewEmployeesByRoles();
          break;
        case "UPDATE_EMPLOYEES_ROLES":
          updateEmployeesRoles();
          break;
        case "VIEW_EMPLOYEES_BY_DEPARTMENTS":
          viewEmployeesByDepartments();
          break;
        case "UPDATE_EMPLOYEES_DEPARTMENTS":
          updateEmployeesDepartments();
          break;
        case "EXIT_APPLICATION":
          exitApplication();
          break;
      }
    });
}

function viewAllEmployees() {
  // Query DB for all employees
  db.query("SELECT * FROM employees", function (err, results) {
    if (err) throw err;
    console.table(results);
    MainPrompt();
  });
}

function viewAllRoles() {
  // Query DB for all roles
  db.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
    console.table(results);
    MainPrompt();
  });
}

function viewAllDepartments() {
  // Query DB for all departments
  db.query("SELECT * FROM departments", function (err, results) {
    if (err) throw err;
    console.table(results);
    MainPrompt();
  });
}

function addEmployees() {
  // Prompt user for employee information
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the employee's first name:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the employee's last name:",
      },
      {
        type: "number",
        name: "role_id",
        message: "Enter the ID of the employee's role:",
      },
      {
        type: "number",
        name: "manager_id",
        message:
          "Enter the ID of the employee's manager (or leave blank if none):",
        default: null,
      },
    ])
    .then(function (answers) {
      // Insert new employee into DB
      db.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          answers.first_name,
          answers.last_name,
          answers.role_id,
          answers.manager_id,
        ],
        function (err, results) {
          if (err) throw err;
          console.log("Employee added successfully!");
          MainPrompt();
        }
      );
    });
}

function removeEmployees() {
  // Query DB for all employees
  db.query("SELECT * FROM employees", function (err, results) {
    if (err) throw err;
    // Prompt user to select the employee to remove
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee would you like to remove?",
          choices: results.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
      ])
      .then(function ({ employeeId }) {
        // Delete selected employee from DB
        db.query(
          "DELETE FROM employees WHERE id = ?",
          employeeId,
          function (err, results) {
            if (err) throw err;
            console.log(
              `Employee with ID ${employeeId} removed from database.`
            );
            MainPrompt();
          }
        );
      });
  });
}

function addRoles() {
  // Prompt user for role information
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of the new role:",
      },
      {
        type: "number",
        name: "salary",
        message: "Enter the salary for the new role:",
      },
      {
        type: "number",
        name: "department_id",
        message: "Enter the ID of the department for the new role:",
      },
    ])
    .then(function (answers) {
      // Insert new role into DB
      db.query(
        "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
        [answers.title, answers.salary, answers.department_id],
        function (err, results) {
          if (err) throw err;
          console.log("Role added successfully!");
          MainPrompt();
        }
      );
    });
}

function removeRoles() {
  // Query DB for all roles
  db.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
    // Prompt user to select a role to remove
    inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "Select a role to remove:",
          choices: results.map((role) => ({
            name: role.title,
            value: role.id,
          })),
        },
      ])
      .then(function ({ role }) {
        // Remove selected role from DB
        db.query(
          "DELETE FROM roles WHERE id = ?",
          [role],
          function (err, results) {
            if (err) throw err;
            console.log("Role removed successfully!");
            MainPrompt();
          }
        );
      });
  });
}

function addDepartments() {
  // Prompt user for department information
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the new department:",
      },
    ])
    .then(function (answers) {
      // Insert new department into DB
      db.query(
        "INSERT INTO departments (name) VALUES (?)",
        [answers.name],
        function (err, results) {
          if (err) throw err;
          console.log("Department added successfully!");
          MainPrompt();
        }
      );
    });
}

function removeDepartments() {
  // Query DB for all departments
  db.query("SELECT * FROM departments", function (err, results) {
    if (err) throw err;
    // Prompt user to select a department to remove
    inquirer
      .prompt([
        {
          type: "list",
          name: "department",
          message: "Select a department to remove:",
          choices: results.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
      ])
      .then(function ({ department }) {
        // Remove selected department from DB
        db.query(
          "DELETE FROM departments WHERE id = ?",
          [department],
          function (err, results) {
            if (err) throw err;
            console.log("Department removed successfully!");
            MainPrompt();
          }
        );
      });
  });
}

function viewEmployeesByRoles() {
  // Query DB for all roles
  db.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
    // Create an array of role names
    const roles = results.map((role) => role.title);
    // Prompt user to select a role to view employees by
    inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "Which role would you like to view employees by?",
          choices: roles,
        },
      ])
      .then(function ({ role }) {
        // Query DB for all employees with the selected role
        db.query(
          "SELECT * FROM employees WHERE role_id = (SELECT id FROM roles WHERE title = ?)",
          [role],
          function (err, results) {
            if (err) throw err;
            console.table(results);
            MainPrompt();
          }
        );
      });
  });
}

function updateEmployeesRoles() {
  // Query DB for all employees
  db.query("SELECT * FROM employees", function (err, employees) {
    if (err) throw err;
    // Prompt user to select an employee to update
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee's role do you want to update?",
          choices: employees.map((employee) => ({
            name: employee.first_name + " " + employee.last_name,
            value: employee.id,
          })),
        },
      ])
      .then(function ({ employee }) {
        // Query DB for all roles
        db.query("SELECT * FROM roles", function (err, roles) {
          if (err) throw err;
          // Prompt user to select a new role for the employee
          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roles.map((role) => ({
                  name: role.title,
                  value: role.id,
                })),
              },
            ])
            .then(function ({ role }) {
              // Update the employee's role in DB
              db.query(
                "UPDATE employees SET role_id = ? WHERE id = ?",
                [role, employee],
                function (err, result) {
                  if (err) throw err;
                  console.log("Employee role updated successfully!");
                  MainPrompt();
                }
              );
            });
        });
      });
  });
}

function viewEmployeesByDepartments() {
  // Query DB for all departments
  db.query("SELECT * FROM departments", function (err, results) {
    if (err) throw err;
    // Prompt user to select a department
    inquirer
      .prompt({
        type: "list",
        name: "departmentId",
        message: "Which department would you like to view employees for?",
        choices: results.map((department) => ({
          name: department.name,
          value: department.id,
        })),
      })
      .then(function ({ departmentId }) {
        // Query DB for all employees in the selected department
        db.query(
          "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id WHERE departments.id = ?",
          [departmentId],
          function (err, results) {
            if (err) throw err;
            console.table(results);
            MainPrompt();
          }
        );
      });
  });
}

function updateEmployeesDepartments() {
  // Query DB for all employees
  db.query("SELECT * FROM employees", function (err, employees) {
    if (err) throw err;
    // Prompt user to select an employee to update
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee's department do you want to update?",
          choices: employees.map((employee) => ({
            name: employee.first_name + " " + employee.last_name,
            value: employee.id,
          })),
        },
      ])
      .then(function ({ employee }) {
        // Query DB for all departments
        db.query("SELECT * FROM departments", function (err, departments) {
          if (err) throw err;
          // Prompt user to select a new department for the employee
          inquirer
            .prompt([
              {
                type: "list",
                name: "department",
                message: "What is the employee's new department?",
                choices: departments.map((department) => ({
                  name: department.name,
                  value: department.id,
                })),
              },
            ])
            .then(function ({ department }) {
              // Update employee's department in DB
              db.query(
                "UPDATE employees SET department_id = ? WHERE id = ?",
                [department, employee],
                function (err, result) {
                  if (err) throw err;
                  console.log("Employee department updated successfully!");
                  MainPrompt();
                }
              );
            });
        });
      });
  });
}

function exitApplication() {
  console.log("Exiting application...");
  process.exit(); // exit the Node.js process
}

// Call MainPrompt function to start the application
MainPrompt();
