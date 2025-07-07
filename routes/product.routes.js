const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');

// Todas protegidas con JWT, eliminar sólo admin
router.get('/', auth, productCtrl.getProducts);
router.get('/:id', auth, productCtrl.getProductById);
router.post('/', auth, role('admin'), productCtrl.createProduct);
router.put('/:id', auth, role('admin'), productCtrl.updateProduct);
router.delete('/:id', auth, role('admin'), productCtrl.deleteProduct);

module.exports = router;

