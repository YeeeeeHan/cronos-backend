import { ethers } from 'ethers';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  InternalServerError,
  InvalidWalletAddressError,
  MissingInputError,
  RPCError,
} from '../errors/customErrors';
import { isValidAddress } from '../middlewares/verifiers';
import { getCROBalance } from '../service/web3';
import { NETWORK_ERROR } from '../utils/constants';
import { log } from '../utils/logger';
import { GetBalanceResponse } from '../utils/types/types';
import { parseBalance } from '../utils/utils';

// @desc    Get CRO balance of walletAddress
// @route   GET /balance/:walletAddress/
// @access  JWT protected
const getBalance = asyncHandler(async (req: Request, res: Response) => {
  log.info(`[getBalance]: req.params: ${JSON.stringify(req.params)}`);

  const { walletAddress } = req.params;

  // Check if the wallet address are empty
  if (!walletAddress) {
    throw new MissingInputError('walletAddress is missing');
  }

  // Validate the wallet address
  if (!isValidAddress(walletAddress)) {
    throw new InvalidWalletAddressError(walletAddress);
  }

  try {
    // Get the balance of the CRO token for the given address
    const balance = await getCROBalance(walletAddress);

    // Build response
    const responseData: GetBalanceResponse = {
      walletAddress,
      balance,
      formatBalance: parseBalance(ethers.utils.formatEther(balance)),
    };

    res.status(200).json(responseData);
  } catch (e: any) {
    if (e.code && e.code === NETWORK_ERROR) {
      log.error(`[getBalance] RPC network error: ${e}`);
      throw new RPCError('RPC network error.');
    }
    log.error(`[getBalance] Unexpected error: ${e}`);
    throw new InternalServerError('Error occured while fetching balance');
  }
});

export { getBalance };
