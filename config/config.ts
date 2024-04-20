import dotenv from 'dotenv';
import { DEV, LOCAL, PROD } from '../utils/constants';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV,
  isLocal: process.env.NODE_ENV === LOCAL,
  isDev: process.env.NODE_ENV === DEV,
  isProd: process.env.NODE_ENV === PROD,
};
