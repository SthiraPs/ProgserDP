import { Router } from 'express';
import depatmentsController from '../controllers/depatmentsController';

const router = Router();

router.get('/', depatmentsController.getDepartments);

export default router;
