import { Router } from 'express';
import requestsController from '../controllers/requestsController';

const router = Router();

router.get('/', requestsController.getRequests);
router.post('/', requestsController.createRequest);

export default router;
