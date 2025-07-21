import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import AuthModel from "../models/authModel.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
    throw new ApiError(401, "Refresh token missing. Please login.");
    }
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
    if (!decoded) {
      throw new ApiError(401, "Invalid token.");
    }
    const user = await AuthModel.findById(decoded._id);
    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    req.user = user; 
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message || "Unauthorized" });
  }
};


export const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN); 
    const user = await AuthModel.findById(decoded._id).select('-password'); 

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = { id: user._id }; 
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};



export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied for role: ${req.user?.role}`,
      });
    }
    next();
  };
};
