import { Router } from 'express';
import rolesController from '../controllers/rolesController';

const router = Router();

router.get('/', rolesController.getRoles);

export default router;
