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
                viewDepartments();
                break;

            case 'View All Roles':
                viewRoles();
                break;
            
            case 'View All Employees':
                viewEmployees();
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
function viewDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        init();
    })
};

// View Roles Function
function viewRoles() {
    const sql = `SELECT role.id, role.title, department.name AS department, salary 
    FROM role
    LEFT JOIN department 
    ON role.department_id = department.id
    ORDER BY role.id; `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        init();
    })
};

// View Employees Function
function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS Manager
    FROM role
    LEFT JOIN employee 
    ON role.id = employee.role_id
    LEFT JOIN department 
    ON role.department_id = department.id
    LEFT JOIN employee manager
    ON employee.manager_id = manager.id
    ORDER BY employee.role_id;`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        init();
    })
};

// Add Department Function
function addDepartment() {
    inquirer.prompt({
        name: 'department',
        type: 'input',
        message: 'What is the name of the department?'
    }).then((answer, err) => {
        db.query(
            `INSERT INTO department SET ?`,
            {
                name: answer.department
            }
        );
        if (err) throw err;
        console.log(`Added ${answer.department} to the database.`);
        init();
    })
};

// Add Role Function
function addRole() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the name of the role?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of the role?',
            validate: input => {
                if (isNaN(input) === false) {
                    return true;
                }
                console.log('Please enter a number.');
            }
        },
        {
            name: 'department',
            type: 'list',
            message: 'What department does the role belong to?',
            choices: () =>
            result.map((result) => result.name),
        }
    ]).then((answer, err) => {
        const departmentID = result.filter((result) => result.name === answer.department)[0].id;
        db.query(
            `INSERT INTO role SET ?`,
            {
                title: answer.title,
                salary: answer.salary,
                department_id: departmentID
            }
        );
        if (err) throw err;
        console.log(`Added ${answer.title} to the database.`);
        init();
    });
    })
};

// Add Employee Function

// Update Employee Role Function

