// === VALIDATIONS ===
// Product validations
const validateProduct = (req, res, next) => {
    const { name, price, stock } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'El nombre del producto es obligatorio.' });
    }
    if (isNaN(price) || price <= 0) {
        return res.status(400).json({ error: 'El precio debe ser un número mayor a 0.' });
    }
    if (isNaN(stock) || stock < 0) {
        return res.status(400).json({ error: 'El stock no puede ser un valor negativo.' });
    }

    next(); 
}

// Message validations
const validateContact = (req, res, next) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Todos los campos de contacto son obligatorios.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'El formato del correo electrónico no es válido.' });
    }

    if (message.length < 10) {
        return res.status(400).json({ error: 'El mensaje debe tener al menos 10 caracteres.' });
    }

    next();
};

// === EXPORT MODULE ===
module.exports = {
    validateProduct,
    validateContact
};