const express = require('express');
const mysql = require('mysql2'); // Use mysql2 instead of mysql
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: '123456', // replace with your MySQL password
    database: 'wings_cafe_inventory' // replace with your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// API routes
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    db.query('INSERT INTO products SET ?', newProduct, (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, ...newProduct });
    });
});


const PORT = 5002; // Define PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/api/products', (req, res) => {
  const { name, description, category, price, quantity } = req.body;
  const query = 'INSERT INTO products (name, description, category, price, quantity) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [name, description, category, price, quantity], (err, results) => {
    if (err) {
      console.error('Database insertion error:', err);
      return res.status(500).json({ error: 'Database insertion failed' });
    }
    res.json({ id: results.insertId, message: 'Product added successfully' });
  });
});
