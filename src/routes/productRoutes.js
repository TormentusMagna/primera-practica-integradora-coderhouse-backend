import { Router } from 'express';
import * as productControllers from '../controllers/productControllers.js';

const router = Router();

router
  .route('/api/products')
  .get(productControllers.getProducts)
  .post(productControllers.addProduct);

router
  .route('/api/products/:pid')
  .get(productControllers.getSingleProduct)
  .put(productControllers.updateProduct)
  .delete(productControllers.deleteProduct);

export default router;
