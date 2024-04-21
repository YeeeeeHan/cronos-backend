import dotenv from 'dotenv';
import { DEV, LOCAL, MAINNET, PROD, TESTNET } from '../utils/constants';
dotenv.config();

export const config = {
  ENV: process.env.NODE_ENV,
  isLocal: process.env.NODE_ENV === LOCAL,
  isDev: process.env.NODE_ENV === DEV,
  isProd: process.env.NODE_ENV === PROD,

  // Chain
  CHAIN: process.env.CHAIN,
  isMain: process.env.CHAIN === MAINNET,
  isTest: process.env.CHAIN === TESTNET,
  RPC_MAINNET: process.env.RPC_MAINNET,
  RPC_TESTNET: process.env.RPC_TESTNET,

  // Secrets
  JWT_SECRET: process.env.JWT_SECRET,
};
