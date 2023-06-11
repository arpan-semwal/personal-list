// Server Code (index.js)
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Noodle@123',
  database: 'task',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all tasks
app.get('/api/get', (req, res) => {
  const sqlGet = 'SELECT * FROM task_table';
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

// Add a new task
app.post('/api/post', (req, res) => {
  const { task, priority } = req.body;
  const sqlInsert = 'INSERT INTO task_table(task, priority) VALUES (?, ?)';
  db.query(sqlInsert, [task, priority], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      res.send(result);
    }
  });
});

// Delete a task
app.delete('/api/remove/:id', (req, res) => {
  const { id } = req.params;
  const sqlRemove = 'DELETE FROM task_table WHERE id = ?';
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      res.send(result);
    }
  });
});

// Get a specific task by ID
app.get('/api/get/:id', (req, res) => {
  const { id } = req.params;
  const sqlGet = 'SELECT * FROM task_table WHERE id = ?';
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      res.send(result);
    }
  });
});

// Update a task
app.put('/api/put/:id', (req, res) => {
  const { id } = req.params;
  const { task, priority } = req.body;
  const sqlUpdate = 'UPDATE task_table SET task=?, priority=? WHERE id=?';
  db.query(sqlUpdate, [task, priority, id], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      res.send(result);
    }
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
