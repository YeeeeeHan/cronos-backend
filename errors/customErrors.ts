// Custom Error class
export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

// NotFound
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

// InvalidInput
export class MissingInputError extends CustomError {
  constructor(input: string) {
    super(`Missing Input: ${input}`);
  }
}

// InvalidWalletAddress
export class InvalidWalletAddressError extends CustomError {
  constructor(walletAddress: string) {
    super(`Invalid Wallet Address: ${walletAddress}`);
  }
}

// InvalidTokenAddress
export class InvalidTokenAddressError extends CustomError {
  constructor(tokenAddress: string) {
    super(`Invalid Token Address: ${tokenAddress}`);
  }
}
