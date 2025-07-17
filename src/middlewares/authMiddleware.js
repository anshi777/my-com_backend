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
