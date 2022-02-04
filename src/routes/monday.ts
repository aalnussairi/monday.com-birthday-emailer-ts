import { Router } from 'express';
import { executeAction } from '../controllers/mondayController';
import authMiddleware from '../middlewares/authentication';

const mondayRoutes = Router();

mondayRoutes.post('/execute_action', authMiddleware, executeAction);

export default mondayRoutes;
