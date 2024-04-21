import express, { Router } from 'express';
import { getBalance } from '../controllers/balance';
import { protect } from '../middlewares/authMiddleware';
import { sanitizePathParams } from '../middlewares/sanitizers';

const router: Router = express.Router();

// /balance/:walletAddress
router.route('/:walletAddress').get(protect, sanitizePathParams, getBalance);

export default router;
