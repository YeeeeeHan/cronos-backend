// // Middleware to verify wallet address
// export const verifyWalletAddress = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const walletAddressParam = req.params.walletAddress;

//   // Check if the address is provided in the path parameter and is valid
//   if (walletAddressParam && !isValidAddress(walletAddressParam)) {
//     return res
//       .status(400)
//       .json({ error: new InvalidWalletAddressError().message });
//   }

//   // If the address is valid, pass control to the next middleware
//   next();
// };

// // Middleware to verify token address
// export const verifyTokenAddress = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const tokenAddressParam = req.params.tokenAddress;

//   // Check if address is provided in the path parameter and is valid
//   if (tokenAddressParam && !isValidAddress(tokenAddressParam)) {
//     return res
//       .status(400)
//       .json({ error: new InvalidTokenAddressError().message });
//   }

//   // If the address is valid, pass control to the next middleware
//   next();
// };

export const isValidAddress = (address: string) => {
  // Regular expression to check if the address is a valid Ethereum address
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  return addressRegex.test(address);
};
