// === LIBRARIES ===
const express = require('express');
const cors = require('cors');
const db = require('./db')
const path = require('path');

// === CONSTANTS ===
const app = express();

// === CONFIGURATION ===
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// === ROUTES ===
// Test route
app.get('/', (req, res) => {
    res.send('API working correctly')
});

// Get products
app.get('/api/catalog', (req, res) => {
    db.query('SELECT * FROM products', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener productos' })
        }
        res.json(result);
    });
});

// Get product by id
app.get('/api/catalog/:id', (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM products WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el producto' })
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Error: Producto no encontrado' })
        }
        res.json(result[0]);
    });
});

// Add product
/*app.post('/api/catalog', (req, res) => {
    const { name, category, duration, mode, teacher, description } = req.body;

    db.query(
        'INSERT INTO courses (name, category, duration, mode, teacher, description) VALUES (?,?,?,?,?,?)'
        [name, category, duration, mode, teacher, description],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al crear el curso' })
            }

            res.json({
                message: 'Curso insertado correctamente',
                id: result.insertId
            })

        }
    )
});*/

// === DB LISTENER ===
app.listen(3000, () => {
    console.log('Backend server on http://localhost:3000')
}); 