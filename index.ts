// src/index.ts
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { config } from './config/config';
import balanceRouter from './routes/balance';
import tokenBalanceRouter from './routes/token-balance';
import { BALANCE, TOKEN_BALANCE } from './utils/constants';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

console.log(`[index.ts]: Running on "${config.ENV}" environment`);
console.log(`[index.ts]: Server is running at http://localhost:${port}`);

// Configure express
app.use(express.json()); // Informs express to recognise incoming request object as JSON object
app.use(express.urlencoded({ extended: false })); // Informs express to recognise incoming request object as JSON object

// Mount routers
app.use(`/${BALANCE}`, balanceRouter);
app.use(`/${TOKEN_BALANCE}`, tokenBalanceRouter);

app.get(`/`, (req: Request, res: Response) => {
  res.send('Welcome to Cronos backend');
});

app.listen(port, () => {});
