import express from 'express'
import {loginAuth, logoutAuth, registerUser, resendOtp, verification} from '../controllers/authController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import upload from '../servicess/upload.js';
const route = express.Router()


route.post("/register", upload.fields([{ name: "img" }, { name: "coverImg" }]), registerUser);
route.post('/otp',verification)
route.post('/resendOtp',resendOtp)
route.post('/login',loginAuth)
route.post('/logout',authenticateUser,logoutAuth)
export default route;
