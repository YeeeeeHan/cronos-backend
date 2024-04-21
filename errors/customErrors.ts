import { StatusCode, httpStatusCodes } from '../utils/types/statusCodes';

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
    super(`Resource not found: ${resource}`, httpStatusCodes['404']);
  }
}

// BadRequest
export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(`Bad Request: ${message}`, httpStatusCodes['400']);
  }
}

// InternalServerError
export class InternalServerError extends CustomError {
  constructor(message: string) {
    super(`Internal Server Error: ${message}`, httpStatusCodes['500']);
  }
}

// Error when a required input is missing
export class MissingInputError extends CustomError {
  constructor(input: string) {
    super(`Missing Input: ${input}`, httpStatusCodes['400']);
  }
}

// Error when an invalid wallet address is provided
export class InvalidWalletAddressError extends CustomError {
  constructor(walletAddress: string) {
    super(`Invalid Wallet Address: ${walletAddress}`, httpStatusCodes['204']);
  }
}

// Error when an invalid token address is provided
export class InvalidTokenAddressError extends CustomError {
  constructor(tokenAddress: string) {
    super(`Invalid Token Address: ${tokenAddress}`, httpStatusCodes['204']);
  }
}

// Error when username already exists
export class UserExistsError extends CustomError {
  constructor(username: string) {
    super(`User already exists: ${username}`, httpStatusCodes['409']);
  }
}

// Error when authorization fails
export class AuthorizationError extends CustomError {
  constructor(message: string) {
    super(`Unauthorized: ${message}`, httpStatusCodes['401']);
  }
}
