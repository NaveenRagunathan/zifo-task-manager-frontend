import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { IUser, User } from '../models/User';

// Generate JWT token
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

// Helper to safely get string ID
const getSafeIdString = (id: unknown): string => {
  if (id instanceof mongoose.Types.ObjectId) {
    return id.toString();
  }
  // Fallback or throw error if needed, assuming it should always be ObjectId here
  return String(id);
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        status: 'error',
        message: 'User already exists',
      });
      return;
    }

    // Create user
    const user: IUser = await User.create({
      name,
      email,
      password,
    });

    const userIdString = getSafeIdString(user._id);
    // Generate token and send response
    res.status(201).json({
      status: 'success',
      data: {
        id: userIdString,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(userIdString),
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
      return;
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
      return;
    }

    const userIdString = getSafeIdString(user._id);
    // Generate token and send response
    res.status(200).json({
      status: 'success',
      data: {
        id: userIdString,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(userIdString),
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    // req.user is attached by the protect middleware
    const user: IUser | null = await User.findById(req.user?._id).select('-password');
    
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
}; 