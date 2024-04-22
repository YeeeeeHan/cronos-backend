import { PrismaClient } from '@prisma/client';
import { log } from '../utils/logger';
const prisma = new PrismaClient();

export const pingDB = async () => {
  log.info(`[pingDB]: Pinging DB...`);
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    log.info(`[pingDB]: ${error}`);
    process.exit(1);
  }
};
