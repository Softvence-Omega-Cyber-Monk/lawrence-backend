import { Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../../../middleware/auth";

// Helper functions
const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "15m" });
};

const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "7d" });
};

// Register User
const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(httpStatus.CREATED).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: "Something went wrong",
      err,
    });
  }
};

// Login User
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }

    if (!user.password) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "This account was created with a social login provider",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }

    const payload = { id: user._id, role: user.role };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Store in cookie (optional - you can remove this if you only want response body)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send both tokens in response
    res.status(httpStatus.OK).json({
      message: "Login successful",
      accessToken,
      refreshToken, // Add this line
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: "Something went wrong",
      err,
    });
  }
};

const getUserInfo = async (req: AuthRequest, res: Response) => {
  try {
    // Now properly typed - req.user comes from your authMiddleware
    const userId = req.user?.id;

    if (!userId) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "User not authenticated"
      });
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "User not found"
      });
    }

    res.status(httpStatus.OK).json({
      message: "User info retrieved successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        // Add any other fields you want to return
      }
    });
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: "Something went wrong",
      err,
    });
  }
};


// Refresh Token
const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "No refresh token provided" });
    }

    jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string,
      (err: jwt.VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
        if (err || !decoded) {
          return res.status(httpStatus.FORBIDDEN).json({ message: "Invalid refresh token" });
        }

        const payload = {
          id: (decoded as JwtPayload).id,
          role: (decoded as JwtPayload).role,
        };

        const accessToken = generateAccessToken(payload);

        res.status(httpStatus.OK).json({ accessToken });
      }
    );
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: "Something went wrong",
      err,
    });
  }
};

// Logout
const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  res.status(httpStatus.OK).json({ message: "Logged out successfully" });
};

export const UserControllers = {
  createUser,
  loginUser,
  getUserInfo,
  refreshToken,
  logoutUser,
};
