import { Router } from 'express';
import * as CartControllers from '../controllers/cartControllers.js';

const router = Router();

router.post('/api/carts', CartControllers.addCart);

router.get('/api/carts/:cid', CartControllers.getCartProducts);

router.post('/:cid/product/:pid', CartControllers.addProductsToCart);

export default router;
