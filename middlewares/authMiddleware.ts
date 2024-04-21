import { PrismaClient, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: User | null;
}
const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      res.status(401);
      throw new Error('Token is missing');
    }

    if (!req.headers.authorization.startsWith('Bearer')) {
      res.status(401);
      throw new Error('Token format is invalid');
    }

    try {
      // Get token from header - "Bearer xxxx-token"
      const token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, config.JWT_SECRET as jwt.Secret) as {
        [key: string]: any;
      };

      // Get user from database, and attach it to the request object
      req.user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }
);

export { protect };
