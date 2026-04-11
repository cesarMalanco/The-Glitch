// === LIBRARIES ===
const express = require('express');
const cors = require('cors');
const db = require('./db')
const path = require('path');

// === CONSTANTS ===
const app = express();

// === CONFIGURATION ===
app.use(cors());
//app.use(express.json()); Se requiere más espacio para guardar las imagenes
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
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
app.post('/api/products', (req, res) => {
    // Extraer datos del formulario 
    const { nombre, categoria, marca, precio, stock, imagen, descripcion, disponible } = req.body;

    // Consulta SQL con las columnas de la tabla de MySQL
    const sqlQuery = `
        INSERT INTO products 
        (name, category, brand, price, stock, image_url, description, available) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        // Mapeo de ?
        db.query(
        sqlQuery, 
        [nombre, categoria, marca, precio, stock, imagen, descripcion, disponible ? 1 : 0], 
        (err, result) => {
            if (err) {
                console.error("Detalle del error en consola:", err);
                return res.status(500).json({ error: 'Error al insertar en la base de datos' });
            }

            res.json({
                message: '¡Producto guardado con éxito!',
                id: result.insertId
            });
        }
    );
});

// === DB LISTENER ===
app.listen(3000, () => {
    console.log('Backend server on http://localhost:3000')
}); 