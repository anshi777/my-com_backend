import express from 'express'
import { authenticateUser,authUser } from '../middlewares/authMiddleware.js';
import createReview from '../controllers/reviewController.js';

const route = express.Router()

route.post('/',authUser,createReview)

export default route;
