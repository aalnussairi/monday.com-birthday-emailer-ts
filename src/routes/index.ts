import { Router } from 'express';
import mondayRoutes from './monday';

const router = Router();

router.use(mondayRoutes);

export default router;
