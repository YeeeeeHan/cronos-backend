import express, { Router } from 'express';
import { getBalance } from '../controllers/balance';

const router: Router = express.Router();

// /balance/:walletAddress
router.route('/:walletAddress').get(getBalance);

export default router;
