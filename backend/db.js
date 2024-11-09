// backend/db.js
const mysql = require('mysql2');

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost', // Your MySQL host
  user: 'root', // Your MySQL username
  password: '123456', // Your MySQL password
  database: 'wings_cafe_inventory' // Your MySQL database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Failed to connect to the MySQL database:', err.message);
    process.exit(1); // Exit the application if there's an error
  } else {
    console.log('Connected to the MySQL database');
  }
});

module.exports = db;
