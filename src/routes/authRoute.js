import express from 'express'
import {loginAuth, logoutAuth, registerUser, resendOtp, verification} from '../controllers/authController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userController.js';
const route = express.Router()


route.post('/register',registerUser)
route.post('/otp',verification)
route.post('/resendOtp',resendOtp)
route.post('/login',loginAuth)
route.post('/logout',logoutAuth)
export default route;
