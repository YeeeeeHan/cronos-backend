import express, { Router } from 'express';
import { getTokenBalance } from '../controllers/balance';

const router: Router = express.Router();

// /balance/:address
router.route('/:address').get(getTokenBalance);

export default router;
