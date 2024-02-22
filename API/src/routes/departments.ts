import { Router } from 'express';
import depatmentsController from '../controllers/departmentsController';
//import authenticateToken from '../middleware/authMiddleware';

const router = Router();

router.get('/',  depatmentsController.getDepartments);

export default router;
