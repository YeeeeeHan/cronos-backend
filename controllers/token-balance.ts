import { ethers } from 'ethers';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getCRC20Balance, getCRC20Information } from '../service/web3';
import { parseBalance } from '../utils/utils';

// @desc    Get CRC20 token balance of an address
// @route   GET /token-balance/:address/:tokenAddress
// @access  Public
const getTokenBalance = asyncHandler(async (req: Request, res: Response) => {
  console.log(`[getTokenBalance]: req.params: ${JSON.stringify(req.params)}`);

  const { walletAddress, tokenAddress } = req.params;

  // Check if the wallet address and token address are empty
  if (!walletAddress || !tokenAddress) {
    res.status(400);
    throw new Error('[getTokenBalance] Invalid address or token address');
  }
  try {
    // Get the balance of the ERC20 token for the given address
    const balance = await getCRC20Balance(tokenAddress, walletAddress);

    // Get the symbol of the ERC20 token for the given address
    const tokenInfo = await getCRC20Information(tokenAddress);

    res.status(200).json({
      walletAddress,
      tokenAddress,
      balance,
      formatBalance: parseBalance(ethers.utils.formatEther(balance)),
      tokenName: tokenInfo.name,
      tokenSymbol: tokenInfo.symbol,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Unexpected error occurred. Please try again later.',
      error: e,
    });
  }
});

export { getTokenBalance };
