import express, { Router } from 'express';
import { loginUser, registerUser } from '../controllers/user';

const router: Router = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register new user
 *     description: Register a new user with username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid user data
 *     tags:
 *       - Users
 */
router.route('/').post(registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate a user
 *     description: Authenticate a user with username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *       400:
 *         description: Invalid user data
 *     tags:
 *       - Users
 */
router.route('/login').post(loginUser);

export default router;
