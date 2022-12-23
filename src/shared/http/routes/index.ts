import productRouter from '@modules/products/routes/ProductsRoutes';
import sessionsRoutes from '@modules/users/routes/SessionsRoutes';
import usersRouter from '@modules/users/routes/UsersRoutes';
import passwordRouter from '@modules/users/routes/passwordRoutes';
import profileRouter from '@modules/users/routes/ProfileRoutes';
import { Router } from 'express';
import morgan from 'morgan';

const router = Router();
router.use(morgan('dev'));
router.use('/products', productRouter);
router.use('/users', usersRouter);
router.use('/password', passwordRouter);
router.use('/sessions', sessionsRoutes);
router.use('/profile', profileRouter);

export default router;
