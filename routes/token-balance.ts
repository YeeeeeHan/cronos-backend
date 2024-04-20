import express, { Router } from 'express';
import { getTokenBalance } from '../controllers/balance';

const router: Router = express.Router();

// /token-balance/:address/:tokenAddress
router.route('/:address/:tokenAddress').get(getTokenBalance);

export default router;
