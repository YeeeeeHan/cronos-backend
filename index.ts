// src/index.ts
import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import expressListRoutes from 'express-list-routes';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/config';
import swaggerSpec from './config/swaggerconfig';
import { pingDB } from './controllers/ping';
import {
  CustomError,
  InternalServerError,
  NotFoundError,
} from './errors/customErrors';
import balanceRouter from './routes/balance';
import tokenBalanceRouter from './routes/token-balance';
import userRouter from './routes/user';
import { BALANCE, TOKEN_BALANCE, USERS } from './utils/constants';
import { log } from './utils/logger';
import { ResponseError } from './utils/types/types';

dotenv.config();

export const app: Express = express();
export const port = process.env.PORT || 4000;

log.info(`[index.ts]: Running on "${config.ENV}" environment`);
log.info(`[index.ts]: Running on "${config.CHAIN}" chain`);
log.info(`[index.ts]: Server is running at http://localhost:${port}`);

pingDB();

// 1. Body Parsing Middleware
app.use(express.json()); // Informs express to recognise incoming request object as JSON object
app.use(express.urlencoded({ extended: false })); // Informs express to recognise incoming request object as JSON object

// 2. Router Middleware
app.use(`/${BALANCE}`, balanceRouter);
app.use(`/${TOKEN_BALANCE}`, tokenBalanceRouter);
app.use(`/${USERS}`, userRouter);
app.get(`/`, (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Cronos Backend' });
});

// 3. Swagger Middleware
app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 4. Error Handling Middleware
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

// 5. 404 Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new NotFoundError(req.originalUrl);
  res.status(error.statusCode.code).json({
    code: error.statusCode.code,
    error: error.name,
    errorMessage: error.message,
  });
});

// 6. List all routes
expressListRoutes(app, { prefix: '' });

app.listen(port, () => {});
