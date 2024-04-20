import { ethers } from 'ethers';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getCROBalance } from '../service/web3';
import { parseBalance } from '../utils/utils';

// @desc    Get CRO balance of walletAddress
// @route   GET /balance/:walletAddress/
// @access  Public
const getBalance = asyncHandler(async (req: Request, res: Response) => {
  console.log(`[getBalance]: req.params: ${JSON.stringify(req.params)}`);

  const { walletAddress } = req.params;

  if (!walletAddress) {
    res.status(400);
    throw new Error('[getBalance] Invalid address or token address');
  }

  // Get the balance of the CRO token for the given address
  const balance = await getCROBalance(walletAddress);

  res.status(200).json({
    walletAddress,
    balance,
    formatBalance: parseBalance(ethers.utils.formatEther(balance)),
  });
});

export { getBalance };
