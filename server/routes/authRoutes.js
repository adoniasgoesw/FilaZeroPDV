import express from 'express';
import { register } from '../controllers/Register.js';
import { login } from '../controllers/Login.js';
import { getServicePoints, updateServicePoints, listServicePoints } from '../controllers/ServicePoints.js';
import { createServicePointItem, getServicePointItems, getServicePointItemByIdentifier, updateServicePointItem } from '../controllers/ServicePointItems.js';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory, upload } from '../controllers/Categories.js';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, upload as uploadProduct } from '../controllers/Products.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/service-points', getServicePoints);
router.put('/service-points', updateServicePoints);
router.get('/service-points/list', listServicePoints);
router.post('/service-point-items', createServicePointItem);
router.get('/service-point-items', getServicePointItems);
router.get('/service-point-items/:identifier', getServicePointItemByIdentifier);
router.put('/service-point-items', updateServicePointItem);

// Categories routes
router.post('/categories', upload.single('image'), createCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories', upload.single('image'), updateCategory);
router.delete('/categories/:id', deleteCategory);

// Products routes
router.post('/products', uploadProduct.single('image'), createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.put('/products', uploadProduct.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;