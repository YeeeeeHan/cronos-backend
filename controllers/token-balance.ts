import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

// @desc    Get CRC20 token balance of an address
// @route   GET /token-balance/:address/:tokenAddress
// @access  Public
const getTokenBalance = asyncHandler(async (req: Request, res: Response) => {
  console.log(`[getTokenBalance]: req.params: ${JSON.stringify(req.params)}`);
  res.send('getTokenBalance');
});

export { getTokenBalance };
