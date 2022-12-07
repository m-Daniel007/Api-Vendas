import productRouter from '@modules/products/routes/ProductsRoutes';
import { Router } from 'express';
import morgan from 'morgan';

const router = Router();
router.use(morgan('dev'));
router.use('/products', productRouter);

export default router;
