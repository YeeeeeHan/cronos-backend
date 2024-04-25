import { Express, Request, Response } from 'express';
import { BALANCE, TOKEN_BALANCE, USERS } from '../utils/constants';
import balanceRouter from './balanceRouter';
import tokenBalanceRouter from './tokenBalanceRouter';
import userRouter from './userRouter';

export function routes(app: Express) {
  app.use(`/${BALANCE}`, balanceRouter);
  app.use(`/${TOKEN_BALANCE}`, tokenBalanceRouter);
  app.use(`/${USERS}`, userRouter);
  app.get(`/`, (req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome to Cronos Backend' });
  });
}
