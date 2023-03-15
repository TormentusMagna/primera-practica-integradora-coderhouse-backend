import { Router } from 'express';
import * as viewControllers from '../controllers/viewControllers.js';

const router = Router();

router.get('/products', viewControllers.getProducts);
router.get('/products/:pid', viewControllers.getSingleProduct);
router.get('/realtimeproducts', viewControllers.realTimeProducts);

export default router;
