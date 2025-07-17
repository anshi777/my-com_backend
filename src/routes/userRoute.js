import express from 'express'
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userController.js';
const route = express.Router()

route.get('/',authenticateUser,getAllUsers)
route.get('/:_id',authenticateUser,getUserById)
route.delete('/:_id',authenticateUser,deleteUser)
route.put('/:_id',authenticateUser,updateUser)

export default route;
