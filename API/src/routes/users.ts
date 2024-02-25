import { Router } from 'express';
import usersController from '../controllers/usersController';
import authenticateToken from '../middleware/authMiddleware.';

const router = Router();

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.patch('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

export default router;
