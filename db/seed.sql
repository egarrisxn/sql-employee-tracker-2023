use employee_tracker_db;

INSERT INTO departments
    (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Accounting"),
    ("Legal");

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ("Sales Lead", 100000, 1),
    ("Sales Associate", 50000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Accountant Lead Specialist", 140000, 3),
    ("Accountant", 110000, 3),
    ("Legal Team Lead", 240000, 4),
    ("Lawyer", 190000, 4);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Jane", "Doe", 1, NULL),
    ("Ricky", "Singh", 2, 1),
    ("Scott", "Vogel", 3, NULL),
    ("Reba", "Meyers", 4, 3),
    ("Freddie", "Madball", 5, NULL),
    ("Ian", "McKaye", 6, 5),
    ("Katt", "Moss", 7, NULL),
    ("Eddie", "Sutton", 8, 7);