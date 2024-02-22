import { Router } from 'express';
import departmentsController from '../controllers/departmentsController';
import authenticateToken from '../middleware/authMiddleware.';

const router = Router();

router.get('/', authenticateToken, departmentsController.getDepartments);

export default router;
