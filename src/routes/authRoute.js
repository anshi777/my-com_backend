import express from "express";
import passport from "passport";
import "../servicess/passport.js";
import {
  loginAuth,
  loginWithGit,
  loginWithGoogle,
  logoutAuth,
  registerUser,
  resendOtp,
  verification,
} from "../controllers/authController.js";
import { verifyTokenWithRefresh } from "../middlewares/authMiddleware.js";
const route = express.Router();

route.post("/register", registerUser);
route.post("/otp", verification);
route.post("/resendOtp", resendOtp);
route.post("/login", loginAuth);
route.post("/logout", verifyTokenWithRefresh, logoutAuth);
route.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
route.get("/google/callback", passport.authenticate("google", { session: false }), loginWithGoogle);
route.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
route.get("/github/callback", passport.authenticate("github", { session: false }), loginWithGit);

export default route;
