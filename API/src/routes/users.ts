import { Router } from 'express';
import usersController from '../controllers/usersController';

const router = Router();

router.get('/', usersController.getUsers);
// Add routes for POST, PUT, DELETE as needed

export default router;
