import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// @desc    Register new user
// @route   POST /users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check if user exists
  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
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
    const token = generateToken(user.id);
    res.status(201).json({});
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate a user
// @route   POST /users/login
// @access  Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

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
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// // @desc    Get user data
// // @route   GET /api/users/me
// // @access  Private
// const getMe = asyncHandler(async (req: Request, res: Response) => {
//   res.status(200).json(req.user);
// });

// Generate JWT for an id
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
};

export { loginUser, registerUser };
