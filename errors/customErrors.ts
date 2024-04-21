import {
  STATUS_CODE_204,
  STATUS_CODE_400,
  STATUS_CODE_401,
  STATUS_CODE_404,
  STATUS_CODE_409,
  STATUS_CODE_500,
  StatusCode,
} from '../utils/types/statusCodes';

// Custom Error class
export class CustomError extends Error {
  statusCode: StatusCode;

  constructor(message: string, statusCode: StatusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

// Error when a resource is not found
export class NotFoundError extends CustomError {
  constructor(resource: string) {
    super(`Resource not found: ${resource}`, STATUS_CODE_404);
  }
}

// BadRequest
export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(`Bad Request: ${message}`, STATUS_CODE_400);
  }
}

// InternalServerError
export class InternalServerError extends CustomError {
  constructor(message: string) {
    super(`Internal Server Error: ${message}`, STATUS_CODE_500);
  }
}

// Error when a required input is missing
export class MissingInputError extends CustomError {
  constructor(input: string) {
    super(`Missing Input: ${input}`, STATUS_CODE_400);
  }
}

// Error when an invalid wallet address is provided
export class InvalidWalletAddressError extends CustomError {
  constructor(walletAddress: string) {
    super(`Invalid Wallet Address: ${walletAddress}`, STATUS_CODE_204);
  }
}

// Error when an invalid token address is provided
export class InvalidTokenAddressError extends CustomError {
  constructor(tokenAddress: string) {
    super(`Invalid Token Address: ${tokenAddress}`, STATUS_CODE_204);
  }
}

// Error when username already exists
export class UserExistsError extends CustomError {
  constructor(username: string) {
    super(`User already exists: ${username}`, STATUS_CODE_409);
  }
}

// Error when authorization fails
export class AuthorizationError extends CustomError {
  constructor(message: string) {
    super(`Unauthorized: ${message}`, STATUS_CODE_401);
  }
}
