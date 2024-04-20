import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

// @desc    Get address CRO balance
// @route   GET /balance/:address
// @access  Public
const getTokenBalance = asyncHandler(async (req: Request, res: Response) => {
  console.log(`[getTokenBalance]: req.params: ${JSON.stringify(req.params)}`);
  res.send('getTokenBalance');
});

export { getTokenBalance };
