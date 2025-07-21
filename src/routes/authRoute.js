import express from "express";
import passport from "passport";
import "../servicess/passport.js";
import {
  loginAuth,
  loginWithGoogle,
  logoutAuth,
  registerUser,
  resendOtp,
  verification,
} from "../controllers/authController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
const route = express.Router();

route.post("/register", registerUser);
route.post("/otp", verification);
route.post("/resendOtp", resendOtp);
route.post("/login", loginAuth);
route.post("/logout", authenticateUser, logoutAuth);
route.get("/google",passport.authenticate("google", { scope: ["profile", "email"] })
);

// route.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/success",
//     failureRedirect: "/failure",
//   })
// );

// // Success route
// route.get("/success", (req, res) => {
//   console.log("User data:", req.user);
//   res.send("✅ Google Login Successful");
// });

// // Failure route
// route.get("/failure", (req, res) => {
//   res.send("❌ Google Login Failed");
// });

route.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  loginWithGoogle
);
export default route;
