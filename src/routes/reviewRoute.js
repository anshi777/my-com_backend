import express from 'express'
import { verifyTokenWithRefresh } from '../middlewares/authMiddleware.js';
import createReview from '../controllers/reviewController.js';

const route = express.Router()

route.post('/',verifyTokenWithRefresh,createReview)

export default route;
