import { Router } from 'express';
import requestsController from '../controllers/requestsController';

const router = Router();

router.get('/', requestsController.getRequests);
// Add routes for POST, PUT, DELETE as needed

export default router;
