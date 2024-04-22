import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const pingDB = async () => {
  console.log(`[pingDB]: Pinging DB...`);
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    console.log(`[pingDB]: ${error}`);
    process.exit(1);
  }
};
