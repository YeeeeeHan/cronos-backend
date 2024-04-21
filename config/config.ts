import dotenv from 'dotenv';
import { DEV, LOCAL, MAINNET, PROD, TEST, TESTNET } from '../utils/constants';
dotenv.config();

export const config = {
  ENV: process.env.NODE_ENV,
  isLocal: process.env.NODE_ENV === LOCAL,
  isDev: process.env.NODE_ENV === DEV,
  isProd: process.env.NODE_ENV === PROD,
  isTest: process.env.NODE_ENV === TEST,

  // Chain
  CHAIN: process.env.CHAIN,
  isMainnet: process.env.CHAIN === MAINNET,
  isTestnet: process.env.CHAIN === TESTNET,
  RPC_MAINNET: process.env.RPC_MAINNET,
  RPC_TESTNET: process.env.RPC_TESTNET,

  // Secrets
  JWT_SECRET: process.env.JWT_SECRET,
};
