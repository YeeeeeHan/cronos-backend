import express, { Router } from 'express';
import { loginUser, registerUser } from '../controllers/user';

const router: Router = express.Router();

// /user
router.route('/').post(registerUser);

// /user/login
router.route('/login').post(loginUser);

export default router;
