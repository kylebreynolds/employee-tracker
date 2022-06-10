const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Kr_9378a',
      database: 'employee_db'
    },
    console.log('Connected to the employee database.')
  );


// Get all candidates
app.get('/api/employee', (req, res) => {
    const sql = `SELECT * FROM employee`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

  console.table(['first_name', 'last_name'], values);


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });






app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });