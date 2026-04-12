// === LIBRARIES ===
const express = require('express');
const cors = require('cors');
const db = require('./db')
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { validateProduct, validateContact } = require('./middleware');

// === CONSTANTS ===
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

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
app.post('/api/catalog', upload.single('image'), validateProduct, (req, res) => {
    const { name, category, brand, price, stock, description } = req.body;
    const image_url = req.file ? req.file.filename : null;

    const query = 'INSERT INTO products (name, category, brand, price, stock, description, image_url) VALUES (?,?,?,?,?,?,?)';

    db.query(query, [name, category, brand, price, stock, description, image_url], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Producto creado', id: result.insertId });
    });
});

// Update product
app.put('/api/catalog/:id', upload.single('image'), validateProduct, (req, res) => {
    const id = req.params.id;
    const { name, category, brand, price, stock, description } = req.body;

    let query = 'UPDATE products SET name=?, category=?, brand=?, price=?, stock=?, description=? WHERE id=?';
    let params = [name, category, brand, price, stock, description, id];

    if (req.file) {
        query = 'UPDATE products SET name=?, category=?, brand=?, price=?, stock=?, description=?, image_url=? WHERE id=?';
        params = [name, category, brand, price, stock, description, req.file.filename, id];
    }

    db.query(query, params, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Producto actualizado' });
    });
});

// Delete product
app.delete('/api/catalog/:id', (req, res) => {
    const id = req.params.id;

    db.query('SELECT image_url FROM products WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al buscar el producto' });

        if (result.length > 0) {
            const imageName = result[0].image_url;

            if (imageName) {
                const imagePath = path.join(__dirname, 'uploads', imageName);

                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('No se pudo borrar el archivo físico:', err);
                    } else {
                        console.log('Imagen borrada del servidor');
                    }
                });
            }
        }

        db.query('DELETE FROM products WHERE id = ?', [id], (err, deleteResult) => {
            if (err) return res.status(500).json({ error: 'Error al borrar de la DB' });
            res.json({ message: 'Producto e imagen eliminados correctamente' });
        });
    });
});

// Sen message
app.post('/api/contact', validateContact, (req, res) => {
    const { name, email, subject, message } = req.body;

    const query = 'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)';

    db.query(query, [name, email, subject, message], (err, result) => {
        if (err) {
            console.error('Error en DB:', err);
            return res.status(500).json({ error: 'Error al guardar el mensaje' });
        }
        res.json({ message: 'Mensaje recibido correctamente', id: result.insertId });
    });
});

// === DB LISTENER ===
app.listen(3000, () => {
    console.log('Backend server on http://localhost:3000')
}); 