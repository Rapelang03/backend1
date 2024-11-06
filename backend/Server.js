const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: 'localhost', // Update with your MySQL host
  user: 'root',      // Update with your MySQL user
  password: '',      // Update with your MySQL password
  database: 'wings_cafe_inventory' // Database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

// Route to get all products
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  });
  
  // Route to add a new product
  app.post('/api/products', (req, res) => {
    const { name, description, category, price, quantity } = req.body;
    db.query(
      'INSERT INTO products (name, description, category, price, quantity) VALUES (?, ?, ?, ?, ?)',
      [name, description, category, price, quantity],
      (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Product added successfully', id: results.insertId });
      }
    );
  });
  
  // Route to update a product
  app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, category, price, quantity } = req.body;
    db.query(
      'UPDATE products SET name = ?, description = ?, category = ?, price = ?, quantity = ? WHERE id = ?',
      [name, description, category, price, quantity, id],
      (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Product updated successfully' });
      }
    );
  });
  
  // Route to delete a product
  app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Product deleted successfully' });
    });
  });
  