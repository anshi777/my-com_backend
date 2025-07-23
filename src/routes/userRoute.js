import express from 'express'
import { verifyTokenWithRefresh } from '../middlewares/authMiddleware.js';
import { deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userController.js';
import upload from '../servicess/upload.js';
const route = express.Router()

route.get('/',verifyTokenWithRefresh,getAllUsers)
route.get('/:_id',verifyTokenWithRefresh,getUserById)
route.delete('/:_id',verifyTokenWithRefresh,deleteUser)
route.put("/:_id",verifyTokenWithRefresh, upload.fields([{ name: "img" }, { name: "coverImg" }]), updateUser);


export default route;
