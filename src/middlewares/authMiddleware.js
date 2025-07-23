import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import AuthModel from "../models/authModel.js";

export const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN); 
    const user = await AuthModel.findById(decoded._id).select('-password'); 

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = { id: user._id }; 
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token..' });
  }
};

export const verifyTokenWithRefresh = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  try {
    if (accessToken) {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
      req.user = decoded;
      return next();
    }
  } catch (err) {
    if (err.name !== "TokenExpiredError") {
      return res.status(403).json({ message: "Invalid access token" });
    }
  }

  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Please log-in token missing" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const user = await AuthModel.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // const newAccessToken = jwt.sign(
    //   { _id: user._id, email: user.email }, 
    //   process.env.ACCESS_TOKEN,
    //   { expiresIn: "15m" } 
    // );
    const newAccessToken = user.generateAccessToken()

    res.setHeader("x-access-token", newAccessToken);
    req.user = { _id: user._id, email: user.email };
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Refresh token expired or invalid. Please log in." });
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
