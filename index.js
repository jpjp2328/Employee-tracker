// Import dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2')
const consoleTable = require('console.table')

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Jpjp2328!@#',
        database: 'employee_db'
    }
);

db.connect(err => {
    if (err) throw err;
    console.log('connected to employee_db database.');
    init();
});

// Menu/Main Page/Inquirer
function init() {
    inquirer.prompt ({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Quit',
        ],
    }).then((answer) => {
        switch (answer.action) {
            case 'View All Departments':
                viewDepartment();
                break;

            case 'View All Roles':
                viewRole();
                break;
            
            case 'View All Employees':
                viewEmployee();
                break;

            case 'Add Department':
                addDepartment();
                break;

            case 'Add Role':
                addRole();
                break;

            case 'Add Employee':
                addEmployee();
                break;

            case 'Update Employee Role':
                updateEmployee();
                break;

            case 'Quit':
                db.end();
                break;
        }
    });
};

// View Department Function

// View Roles Function

// View Employees Function

// Add Department Function

// Add Role Function

// Add Employee Function

// Update Employee Role Function

