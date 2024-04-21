import express, { Router } from 'express';
import { getTokenBalance } from '../controllers/token-balance';
import { protect } from '../middlewares/authMiddleware';
import { sanitizePathParams } from '../middlewares/sanitizers';

const router: Router = express.Router();

// /token-balance/:walletAddress/:tokenAddress
router
  .route('/:walletAddress/:tokenAddress')
  .get(protect, sanitizePathParams, getTokenBalance);

export default router;
