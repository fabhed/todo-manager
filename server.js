const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
const app = express();
const port = 8080;

const db = new Database('./database.sqlite');

const tableCreationStmt = db.prepare(`
  CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY,
      text TEXT NOT NULL
  )
`);

tableCreationStmt.run();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/todos', (req, res) => {
    const todos = db.prepare('SELECT * FROM todos').all();
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const { text } = req.body;
    const stmt = db.prepare('INSERT INTO todos (text) VALUES (?)');
    const info = stmt.run(text);
    const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(info.lastInsertRowid);
    res.json(todo);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
