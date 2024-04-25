import express, { Router } from 'express';
import { getBalance } from '../controllers/balanceController';
import { protect } from '../middlewares/authMiddleware';
import { sanitizePathParams } from '../middlewares/sanitizeMiddleware';

const router: Router = express.Router();

/**
 * @swagger
 * /balance/{walletAddress}:
 *   get:
 *     summary: Get CRO balance of walletAddress
 *     description: Retrieve the balance of CRO token for the specified wallet address, authenticated by JWT token.
 *     parameters:
 *       - in: path
 *         example: "0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48"
 *         name: walletAddress
 *         schema:
 *           type: string
 *         required: true
 *         description: The wallet address for which to retrieve the balance.
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token in the format "Bearer {token}".
 *     responses:
 *       '200':
 *         description: Successful response containing the wallet address, balance, and token balance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 walletAddress:
 *                   type: string
 *                   description: The wallet address for which the balance is retrieved.
 *                 balance:
 *                   type: string
 *                   description: The balance of the CRO token for the specified wallet address.
 *                 formatBalance:
 *                   type: string
 *                   description: The formatted balance of the CRO token (in readable format).
 *                 tokenBalance:
 *                   type: string
 *                   description: The balance of the JWT token.
 *       '400':
 *         description: Error response when invalid data is provided or an unexpected error occurs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the error.
 *                 error:
 *                   type: string
 *                   description: The details of the error.
 *       '401':
 *         description: Error response when the JWT token is invalid or missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the error.
 *                 error:
 *                   type: string
 *                   description: The details of the error.
 *     tags:
 *       - Balance
 *     security:
 *       - BearerAuth: []
 */
router.route('/:walletAddress').get(protect, sanitizePathParams, getBalance);

export default router;
