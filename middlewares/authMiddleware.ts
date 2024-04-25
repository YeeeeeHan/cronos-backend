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

// Middleware to protect routes
const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    // Get authorisationHeader from header - "Bearer xxxx
    const authorisationHeader = req.headers['x-authorization'] as String;

    if (!authorisationHeader) {
      throw new AuthorizationError('No token');
    }

    if (!authorisationHeader.startsWith('Bearer')) {
      throw new AuthorizationError('Invalid token format');
    }

    try {
      // Get token from header - "Bearer xxxx"
      const token = authorisationHeader.split(' ')[1];

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
      throw new AuthorizationError('Token verification failed');
    }
  }
);

export { protect };
