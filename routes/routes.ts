import { Express, Request, Response } from 'express';
import balanceRouter from '../routes/balance';
import tokenBalanceRouter from '../routes/token-balance';
import userRouter from '../routes/user';
import { BALANCE, TOKEN_BALANCE, USERS } from '../utils/constants';

export function routes(app: Express) {
  app.use(`/${BALANCE}`, balanceRouter);
  app.use(`/${TOKEN_BALANCE}`, tokenBalanceRouter);
  app.use(`/${USERS}`, userRouter);
  app.get(`/`, (req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome to Cronos Backend' });
  });
}
