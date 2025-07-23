import {
  sendOtp,
  sendWelcomeEmail,
  sendLoginMail,
  sendLogoutMail,
} from "../servicess/email.js";
import AuthModel from "../models/authModel.js";
import bcrypt from "bcryptjs";
import { generateOtp } from "../utils/Otp.js";
import { asyncHandler } from "../utils/ayncHandler.js";
import { generateAccessAndRefreshToken } from "../helper/tokens.js";

export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if ([name, email, password].some((field) => field?.trim() === "")) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const userExist = await AuthModel.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    // const img = req.files?.img?.[0]?.path;
    // const coverImg = req.files?.coverImg?.[0]?.path;

    const user = new AuthModel({
      name,
      email,
      password: hashedPassword,
      verificationCode: otp,
    });

    await user.save();
    sendOtp(user.email, otp);
    const { password: _, verificationCode, ...safeUser } = user.toObject();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: safeUser,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
});

export const verification = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await AuthModel.findOne({ verificationCode: code });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found.." });
    }
    (user.isAuth = true), (user.verificationCode = undefined);
    await user.save();

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    const userLogedIn = await AuthModel.findById(user._id).select(
      "-refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    await sendWelcomeEmail(user.email, user.name);

    return (
      res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .json({
          success: true,
          accessToken,
          message: "email verified successfully..",
        })
    );
  } catch (error) {
    console.log("verification failed for server error..", error);
    return res.status(500).json({
      success: false,
      message: "Server error while resending OTP.",
    });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });
    }

    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (user.isAuth) {
      return res.status(400).json({
        success: false,
        message: "User is already verified.",
      });
    }

    const newOtp = generateOtp();
    user.verificationCode = newOtp;
    await user.save();

    await sendOtp(email, newOtp);

    return res.status(200).json({
      success: true,
      message: "OTP resent successfully to your email.",
    });
  } catch (error) {
    console.error("Resend OTP failed:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while resending OTP.",
    });
  }
};

export const loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "Email & password are required." });
    }

    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password." });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    await sendLoginMail(email, user.name);
    const { password: _, ...safeUser } = user.toObject();

    return (
      res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .json({
          success: true,
          accessToken,
          message: "User logged in successfully.",
          data: safeUser,
        })
    );
  } catch (error) {
    console.log("User Login failed for server error..", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error.", data: error });
  }
};

export const logoutAuth = async (req, res) => {
  try {
    const { email } = req.body;
    const refreshToken = req.cookies?.refreshToken;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });
    }

    const user = await AuthModel.findOneAndUpdate(
      { email, refreshToken },
      { $unset: { refreshToken: "" } },
      { new: true }
    );
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Found..." });
    }
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "You are not loged in..." });
    }
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    await sendLogoutMail(email, email.name);
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "User logged out successfully.",
      });
  } catch (error) {
    console.log("Logout failed:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during logout.",
    });
  }
};

export const loginWithGoogle = async (req, res) => {
  try {
    const user = req.user;

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    await user.save();
    const { password: _, ...safeUser } = user.toObject();

    return res.status(200).cookie("refreshToken", refreshToken, options).json({
      success: true,
      message: "Google login successful",
      accessToken,
      data: safeUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during logout.",
    });
  }
};
