// Custom Error class
export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

// Error when a resource is not found
export class NotFoundError extends CustomError {
  constructor(resource: string) {
    super(`Resource not found: ${resource}`);
  }
}

// BadRequest
export class BadRequestError extends CustomError {
  constructor(message = 'Bad Request') {
    super(message);
  }
}

// Error when a required input is missing
export class MissingInputError extends CustomError {
  constructor(input: string) {
    super(`Missing Input: ${input}`);
  }
}

// Error when an invalid wallet address is provided
export class InvalidWalletAddressError extends CustomError {
  constructor(walletAddress: string) {
    super(`Invalid Wallet Address: ${walletAddress}`);
  }
}

// Error when an invalid token address is provided
export class InvalidTokenAddressError extends CustomError {
  constructor(tokenAddress: string) {
    super(`Invalid Token Address: ${tokenAddress}`);
  }
}
