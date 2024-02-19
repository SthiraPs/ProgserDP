import { Router } from 'express';
import depatmentsController from '../controllers/departmentsController';

const router = Router();

router.get('/', depatmentsController.getDepartments);

export default router;
