import { ethers } from 'ethers';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  InternalServerError,
  InvalidTokenAddressError,
  InvalidWalletAddressError,
  MissingInputError,
  RPCError,
} from '../errors/customErrors';
import { getCRC20Balance, getCRC20Information } from '../service/web3';
import { NETWORK_ERROR } from '../utils/constants';
import { log } from '../utils/logger';
import { GetTokenBalanceResponse } from '../utils/types/types';
import { isValidAddress, parseBalance } from '../utils/utils';

// @desc    Get CRC20 token balance of an address
// @route   GET /token-balance/:address/:tokenAddress
// @access  JWT protected
const getTokenBalance = asyncHandler(async (req: Request, res: Response) => {
  log.info(`[getTokenBalance]: req.params: ${JSON.stringify(req.params)}`);

  const { walletAddress, tokenAddress } = req.params;

  // Check if the wallet address and token address are empty
  if (!walletAddress || !tokenAddress) {
    throw new MissingInputError('walletAddress or tokenAddress is missing');
  }

  // Validate the wallet address and token address
  if (!isValidAddress(walletAddress)) {
    throw new InvalidWalletAddressError(walletAddress);
  }
  if (!isValidAddress(tokenAddress)) {
    throw new InvalidTokenAddressError(tokenAddress);
  }

  try {
    // Get the balance of the CRC20 token for the given address
    const balance = await getCRC20Balance(tokenAddress, walletAddress);

    // Get the symbol of the CRC20 token for the given address
    const tokenInfo = await getCRC20Information(tokenAddress);

    // Build response
    const responseData: GetTokenBalanceResponse = {
      walletAddress,
      tokenAddress,
      balance,
      formatBalance: parseBalance(ethers.utils.formatEther(balance)),
      tokenName: tokenInfo.name,
      tokenSymbol: tokenInfo.symbol,
    };

    res.status(200).json(responseData);
  } catch (e: any) {
    if (e.code && e.code === NETWORK_ERROR) {
      log.error(`[getBalance] RPC network error: ${e}`);
      throw new RPCError('RPC network error.');
    }

    log.error(`[getTokenBalance]: ${e}`);
    throw new InternalServerError('Error occured while fetching token balance');
  }
});

export { getTokenBalance };
