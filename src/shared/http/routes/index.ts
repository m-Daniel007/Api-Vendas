import productRouter from '@modules/products/routes/ProductsRoutes';
import { Router } from 'express';

const router = Router();

router.use('/products', productRouter);

export default router;
