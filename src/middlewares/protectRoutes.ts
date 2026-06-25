import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { verifyToken } from "../utils/jwt";
import type { JwtPayload } from "jsonwebtoken";
import { User, IUser } from "../api/auth/auth.model";

export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  // 1- check if there is a token and get it
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("Please Login to get access", 401));
  }

  // 2- verify token that it is (not tampered or expired)
  let decoded;
  try {
    decoded = (await verifyToken(token)) as JwtPayload;
  } catch (err) {
    return next(new AppError("token is expired, use refresh token", 401));
  }

  // 3- check if the user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("the user belonging to this token does not exist", 401));
  }

  // Add user to the request
  req.user = user;

  next();
};

export const restrictTo = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    // Check if the user exists and their role matches the allowed roles
    if (!req.user || !req.user.role || !allowedRoles.includes(req.user.role)) {
      return next(new AppError("Forbidden: Access denied", 403));
    }
    next();
  };
};
