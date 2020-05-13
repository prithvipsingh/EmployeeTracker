// seting up pakages which are need to run app
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
// setting up connection with database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Pps1187#deora",
  database: "employee_DB",
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});
//creating start function which promot all options
function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "start",
        choices: [
          "Add Employee",
          "View all Employees",
          "Remove Employee",
          "Add Department",
          "View all Departments",
          "Add Roles",
          "View all Roles",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then(function (res) {
      switch (res.start) {
        case "Add Employee":
          addEmployee();
          break;

        case "View all Employees":
          viewAllEmployees();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Add Department":
          addDept();
          break;

        case "View all Departments":
          viewAllDept();
          break;

        case "Add Roles":
          addRole();
          break;

        case "View all Roles":
          viewAllRoles();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}
// create function for add new employee
function addEmployee() {
  console.log("Inserting a new employee.\n");
  inquirer
    .prompt([
      {
        type: "input",
        message: "First Name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "Last Name?",
        name: "last_name",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role_id",
        choices: [1, 2, 3],
      },
      {
        type: "input",
        message: "Who is their manager?",
        name: "manager_id",
      },
    ])
    .then(function (res) {
      const query = connection.query(
        "INSERT INTO employees SET ?",
        res,
        function (err, res) {
          if (err) throw err;
          console.log("Employee added!\n");

          start();
        }
      );
    });
}
// Function for view all employees
function viewAllEmployees() {
  connection.query(
    'SELECT employees.first_name, employees.last_name, roles.title AS "role", managers.first_name AS "manager" FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees managers ON employees.manager_id = managers.id GROUP BY employees.id',
    function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      start();
    }
  );
}
// Function for delete employees
function removeEmployee() {
  let employeeList = [];
  connection.query(
    "SELECT employees.first_name, employees.last_name FROM employees",
    (err, res) => {
      for (let i = 0; i < res.length; i++) {
        employeeList.push(res[i].first_name + " " + res[i].last_name);
      }
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee would you like to delete?",
            name: "employee",
            choices: employeeList,
          },
        ])
        .then(function (res) {
          const query = connection.query(
            `DELETE FROM employees WHERE concat(first_name, ' ' ,last_name) = '${res.employee}'`,
            function (err, res) {
              if (err) throw err;
              console.log("Employee deleted!\n");
              start();
            }
          );
        });
    }
  );
}
//Create function for add Department 
function addDept(){
  inquirer
  .prompt([
    {
      type: "input",
      name: "deptName", 
      message: "What Department would you like to add?"
    }
  ])
  .then(function(res){
    console.log(res);
    const query = connection.query(
      "INSERT INTO departments SET ?", 
      {
        name: res.deptName
      }, 
      function(err, res){
        connection.query("SELECT * FROM departments", function(err, res){
          console.table(res); 
          start(); 
        })
      }
    )
  })
}
// Adding function for view all department
function viewAllDept(){
  connection.query ("SELECT * FROM departments", function(err, res){
    console.table(res);
    start();
  })
  }