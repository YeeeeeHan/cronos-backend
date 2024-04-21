// src/index.ts
import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import { config } from './config/config';
import { pingDB } from './controllers/ping';
import { CustomError, NotFoundError } from './errors/customErrors';
import balanceRouter from './routes/balance';
import tokenBalanceRouter from './routes/token-balance';
import userRouter from './routes/user';
import { BALANCE, TOKEN_BALANCE, USERS } from './utils/constants';

dotenv.config();

export const app: Express = express();
export const port = process.env.PORT || 4000;

console.log(`[index.ts]: Running on "${config.ENV}" environment`);
console.log(`[index.ts]: Running on "${config.CHAIN}" chain`);
console.log(`[index.ts]: Server is running at http://localhost:${port}`);

pingDB();

// 1. Body Parsing Middleware
app.use(express.json()); // Informs express to recognise incoming request object as JSON object
app.use(express.urlencoded({ extended: false })); // Informs express to recognise incoming request object as JSON object

// 2. Router Middleware
app.use(`/${BALANCE}`, balanceRouter);
app.use(`/${TOKEN_BALANCE}`, tokenBalanceRouter);
app.use(`/${USERS}`, userRouter);
app.get(`/`, (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Cronons Backend' });
});

// 3. 404 Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new NotFoundError(req.originalUrl);
  res.status(404).json({ error: error.name, errorMessage: error.message });
});

// 4. Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(400).json({ error: err.name, errorMessage: err.message });
  }
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {});
