// === LIBRARIES ===
const mysql = require('mysql2');

// === DB CONNECTION ===
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'the-glitch',
    port: '3306'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the DB  ', err);
        return;
    }

    console.log('Successfully connected');
});

// === EXPORT MODULE ===
module.exports = connection;