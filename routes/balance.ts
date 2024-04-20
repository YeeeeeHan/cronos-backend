import express, { Router } from 'express';
import { getBalance } from '../controllers/balance';
import { sanitizePathParams } from '../middlewares/sanitizers';

const router: Router = express.Router();

// /balance/:walletAddress
router.route('/:walletAddress').get(sanitizePathParams, getBalance);

export default router;
