-- View all departments
USE employee_db;
SELECT * FROM department;

-- View all roles table (id/title/department/salary)
SELECT role.id, role.title, department.name AS department, salary 
FROM role
LEFT JOIN department 
ON role.department_id = department.id
ORDER BY role.id; 

-- View all employees table (id/first_name/last_name/title/department/salary/manager)
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS Manager
FROM role
LEFT JOIN employee 
ON role.id = employee.role_id
LEFT JOIN departments 
ON role.department_id = department.id
LEFT JOIN employee manager
ON employee.manager_id = manager.id
ORDER BY employee.role_id;

-- Adding department (enter name of department)
INSERT INTO department SET 
name:

-- Adding role (enter name of role, salary, department(list))
SELECT * FROM department;

INSERT INTO role SET
title:
salary:
department_id:

-- Adding employee (enter first name, last name, role(list), manager(list))
SELECT title, id FROM role;

SELECT CONCAT(manager.first_name, " ", manager.last_name) AS Manager, manager.id
FROM employee
LEFT JOIN employee manager
ON employee.manager_id = manager.id
WHERE employee.manager_id IS NOT NULL;

INSERT INTO employee SET 
first_name:
last_name:
role_id:
manager_id:

-- Updating employee role (select employee(list), select role(list))
SELECT * FROM employee;
SELECT * FROM role;

UPDATE employee SET 
id = user_choice,
role_id = user_choice;
