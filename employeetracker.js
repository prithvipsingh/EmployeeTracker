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
  console.log("connected as id " + connection.threadId +"\n");
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
    .prompt ([ 
      {
        type: "input", 
        message: "First Name?",
        name: "first_name",
      },
      {
        type: "input", 
        message: "Last Name?",
        name: "last_name"
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role_id", 
        choices: [1,2,3]
      },
      {
        type: "input", 
        message: "Who is their manager?",
        name: "manager_id"
      }
    ])
    .then (function(res){
      const query = connection.query(
        "INSERT INTO employees SET ?", 
       res,
        function(err, res) {
          if (err) throw err;
          console.log( "Employee added!\n");
  
          start (); 
        }
      );    
    })
  }