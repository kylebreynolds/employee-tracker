const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');



// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Kr_9378a',
      database: 'employee_db'
    },
    console.log('Connected to the employee database.'),
  );


  var showroles;
  var showdepartments;
  var showemployees;
  
  // mysql connection
  connection.connect(function (err) {
    
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
  
    connection.query("SELECT * from role", function (error, res) {
      showroles = res.map(role => ({ name: role.title, value: role.id }))
    })
    connection.query("SELECT * from department", function (error, res) {
      showdepartments = res.map(dep => ({ name: dep.name, value: dep.id }))
    })
    connection.query("SELECT * from employee", function (error, res) {
      showemployees = res.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
    })
  
    questions();
  })





// INQUIRER menu of questions
function questions() {
  inquirer
    .prompt(
      {
        type: "list",
        message: "What would you like to do?",
        name: "choices",
        choices: [
          {
            name: "View All Employees",
            value: "viewEmployees"
          },
          {
            name: "Add Employee",
            value: "addEmployee"
          },
          {
            name: "Update Employee Role",
            value: "updateRole"
          },
          {
            name: "View All Roles",
            value: "viewRoles"
          },
          {
            name: "Add Role",
            value: "addRole"
          },
          {
            name: "View All Departments",
            value: "viewDepartments"
          },
          {
            name: "Add Department",
            value: "addDept"
          },
        ]
      }).then(function (res) {
      menu(res.choices)
    })
}

function menu(option) {
  switch (option) {
    case "viewEmployees":
      viewEmployees();
      break;
    case "addEmployee":
      addEmployee();
      break;
    case "updateRole":
      updateRole();
    case "viewRoles":
      viewRoles();
      break;
    case "addRole":
      addRole();
      break;  
    case "viewDepartments":
      viewDepartments();
      break;
    case "addDept":
      addDept();
      break;
  }
}

// View db

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, data) {
    console.table(data);
    questions();
  })
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, data) {
    console.table(data);
    questions();
  })
}

function viewRoles() {
  connection.query("SELECT * FROM role", function (err, data) {
    console.table(data);
    questions();
  })
}

// Add to db