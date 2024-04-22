import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import {
  AuthorizationError,
  InternalServerError,
  UserExistsError,
} from '../errors/customErrors';

const prisma = new PrismaClient();

// @desc    Register new user
// @route   POST /users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new AuthorizationError('Invalid user data');
  }

  // Check if user exists
  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (userExists) {
    throw new UserExistsError(username);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      username,
    });
  } else {
    throw new InternalServerError('Error occured while creating user');
  }
});

// @desc    Authenticate a user
// @route   POST /users/login
// @access  Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new AuthorizationError('Missing username or password');
  }

  try {
    // Check for username
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    // If user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user.id);
      res.json({
        id: user.id,
        username,
        token,
      });
    } else {
      throw new AuthorizationError('Invalid username or password');
    }
  } catch (e) {
    throw e;
  }
});

// Generate JWT for an id
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
};

export { loginUser, registerUser };
