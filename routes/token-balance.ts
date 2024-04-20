import express, { Router } from 'express';
import { getTokenBalance } from '../controllers/token-balance';
import { sanitizePathParams } from '../middlewares/sanitizers';

const router: Router = express.Router();

// /token-balance/:walletAddress/:tokenAddress
router
  .route('/:walletAddress/:tokenAddress')
  .get(sanitizePathParams, getTokenBalance);

export default router;
