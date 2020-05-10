// seting up pakages which are need to run app
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
// setting up connection with database 
const connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    passoword: "Pps1187#deora",
    database: "employee_DB"

});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start(); 
  });


