import { PrismaClient, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { AuthorizationError } from '../errors/customErrors';
const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: User | null;
}
const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log(`[protect]: req.headers: ${JSON.stringify(req.headers)}`);
    if (!req.headers.authorization) {
      throw new AuthorizationError('No token');
    }

    if (!req.headers.authorization.startsWith('Bearer')) {
      throw new AuthorizationError('Invalid token format');
    }

    try {
      // Get token from header - "Bearer xxxx"
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
      throw new AuthorizationError('Token verification failed');
    }
  }
);

export { protect };
