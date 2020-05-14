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
  database: "employees",
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
//#region banner
console.log(`,-----------------------------------------------------.
|                                                     |
|     _____                 _                         |
|    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   |
|    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  |
|    | |___| | | | | | |_) | | (_) | |_| |  __/  __/  |
|    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  |
|                    |_|            |___/             |
|                                                     |
|     __  __                                          |
|    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        |
|    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__|       |
|    | |  | | (_| | | | | (_| | (_| |  __/ |          |
|    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          |
|                              |___/                  |
|                                                     |
\`-----------------------------------------------------'
`);
//#endregion

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
        "INSERT INTO employee SET ?",
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
    'SELECT employee.first_name, employee.last_name, role.title AS "role", managers.first_name AS "manager" FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee managers ON employee.manager_id = managers.id GROUP BY employee.id',
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
    "SELECT employee.first_name, employee.last_name FROM employee",
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
            `DELETE FROM employee WHERE concat(first_name, ' ' ,last_name) = '${res.employee}'`,
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
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "What Department would you like to add?",
      },
    ])
    .then(function (res) {
      console.log(res);
      const query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: res.deptName,
        },
        function (err, res) {
          connection.query("SELECT * FROM department", function (err, res) {
            console.table(res);
            start();
          });
        }
      );
    });
}
// Adding function for view all department
function viewAllDept() {
  connection.query("SELECT * FROM department", function (err, res) {
    console.table(res);
    start();
  });
}
//Function for add Role
function addRole() {
  let departments = [];
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      departments.push(res[i].name);
    }
    console.table(res);
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What role would you like to add?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for the role?",
        },
        {
          type: "list",
          name: "department",
          message: "what department?",
          choices: departments
                   
        }
      ])
      .then(function (answers) {
        const department = res.filter(dep => dep.name === answers.department);
        const query = connection.query(
          "INSERT INTO role SET ?",
          {
            title: answers.title,
            salary: answers.salary,
            department_id: department[0].id,
          },
          function (err, answers) {
            if (err) throw err;
            console.log("Role has been Added !")
            start();
          }
        );
      });
  });
}
// Create function for view Roles
function viewAllRoles() {
  connection.query(
    "SELECT role.*, department.name FROM role LEFT JOIN department ON department.id = role.department_id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}
//Adding function for update employeerole
function updateEmployeeRole(){
  connection.query("SELECT first_name, last_name, id FROM employee",
  function(err,res){
    // for (let i=0; i <res.length; i++){
    //   employees.push(res[i].first_name + " " + res[i].last_name);
    // }
    let employee = res.map(employee => ({name: employee.first_name + " " + employee.last_name, value: employee.id}))
  
    inquirer
    .prompt([
      {
        type: "list",
        name: "employeeName",
        message: "Which employee's role would you like to update?", 
        choices: employee
      },
      {
        type: "input",
        name: "role",
        message: "What is your new role?"
      }
    ])
    .then (function(res){
      connection.query(`UPDATE employee SET role_id = ${res.role} WHERE id = ${res.employeeName}`,
      function (err, res){
        console.log(res);
        //updateRole(res);
        start();
      }
      )
    })
  }
  )
  }
  