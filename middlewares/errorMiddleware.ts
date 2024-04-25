import { Express, NextFunction, Request, Response } from 'express';
import {
  CustomError,
  InternalServerError,
  NotFoundError,
} from '../errors/customErrors';
import { log } from '../utils/logger';
import { ResponseError } from '../utils/types/types';

export function errorMiddleware(app: Express) {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // If the error is an instance of CustomError, return the error name and message
    if (err instanceof CustomError) {
      const responseData: ResponseError = {
        code: err.statusCode.code,
        errorName: err.name,
        errorMessage: err.message,
      };
      return res.status(err.statusCode.code).json(responseData);
    }

    // If the error is not an instance of CustomError, return a generic error message
    const unexpectedError = new InternalServerError('Unexpected error');
    const responseData: ResponseError = {
      code: unexpectedError.statusCode.code,
      errorName: unexpectedError.name,
      errorMessage: unexpectedError.message,
    };

    log.error(`[index.ts]: Unexpected error: ${err}`);

    return res.status(unexpectedError.statusCode.code).json(responseData);
  });
}

export function NotFoundMiddleWare(app: Express) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new NotFoundError(req.originalUrl);
    res.status(error.statusCode.code).json({
      code: error.statusCode.code,
      error: error.name,
      errorMessage: error.message,
    });
  });
}
