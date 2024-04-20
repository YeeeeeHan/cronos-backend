import express, { Router } from 'express';
import { getTokenBalance } from '../controllers/token-balance';

const router: Router = express.Router();

// /token-balance/:walletAddress/:tokenAddress
router.route('/:walletAddress/:tokenAddress').get(getTokenBalance);

export default router;
