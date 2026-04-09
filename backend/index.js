// === LIBRARIES ===
const express = require('express');
const cors = require('cors');
const db = require('./db')

// === CONSTANTS ===
const app = express();

// === CONFIGURATION ===
app.use(cors());
app.use(express.json());

// === ROUTES ===
// Test route
app.get('/', (req, res) => {
    res.send('API working correctly')
});

// * OTHER ROUTES HERE *

// === DB LISTENER ===
app.listen(3000, () => {
    console.log('Servidor backend en http://localhost:3000')
}); 