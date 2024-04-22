import express, { Router } from 'express';
import { getTokenBalance } from '../controllers/token-balance';
import { protect } from '../middlewares/authMiddleware';
import { sanitizePathParams } from '../middlewares/sanitizers';

const router: Router = express.Router();

/**
 * @swagger
 * /token-balance/{address}/{tokenAddress}:
 *   get:
 *     summary: Get CRC20 token balance of an address
 *     description: Get the CRC20 token balance of a wallet address for a specific token address.
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         description: The wallet address to check the balance for.
 *         schema:
 *           type: string
 *       - in: path
 *         name: tokenAddress
 *         required: true
 *         description: The address of the CRC20 token to check the balance for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation. Returns the CRC20 token balance and information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 walletAddress:
 *                   type: string
 *                   description: The wallet address.
 *                 tokenAddress:
 *                   type: string
 *                   description: The CRC20 token address.
 *                 balance:
 *                   type: string
 *                   description: The CRC20 token balance.
 *                 formatBalance:
 *                   type: string
 *                   description: The formatted CRC20 token balance.
 *                 tokenName:
 *                   type: string
 *                   description: The name of the CRC20 token.
 *                 tokenSymbol:
 *                   type: string
 *                   description: The symbol of the CRC20 token.
 *       400:
 *         description: Bad request. Either walletAddress or tokenAddress is missing or invalid.
 *       500:
 *         description: Internal server error. An error occurred while fetching the token balance.
 *     tags:
 *       - CRC20 Token Balance
 *     security:
 *       - BearerAuth: []
 */
router
  .route('/:walletAddress/:tokenAddress')
  .get(protect, sanitizePathParams, getTokenBalance);

export default router;
