import { ethers } from 'ethers';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  InvalidWalletAddressError,
  MissingInputError,
} from '../errors/customErrors';
import { isValidAddress } from '../middlewares/verifiers';
import { getCROBalance } from '../service/web3';
import { parseBalance } from '../utils/utils';

// @desc    Get CRO balance of walletAddress
// @route   GET /balance/:walletAddress/
// @access  JWT protected
const getBalance = asyncHandler(async (req: Request, res: Response) => {
  console.log(`[getBalance]: req.params: ${JSON.stringify(req.params)}`);

  const { walletAddress } = req.params;

  // Check if the wallet address and token address are empty
  if (!walletAddress) {
    res.status(400);
    throw new MissingInputError('walletAddress is missing');
  }

  // Validate the wallet address and token address
  if (!isValidAddress(walletAddress)) {
    res.status(400);
    throw new InvalidWalletAddressError(walletAddress);
  }

  try {
    // Get the balance of the CRO token for the given address
    const balance = await getCROBalance(walletAddress);

    res.status(200).json({
      walletAddress,
      balance,
      formatBalance: parseBalance(ethers.utils.formatEther(balance)),
    });
  } catch (e: any) {
    res.status(400).json({
      message: 'Unexpected error occurred. Please try again later',
      error: e,
    });
  }
});

export { getBalance };
