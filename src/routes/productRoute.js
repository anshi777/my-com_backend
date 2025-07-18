import express from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  productDelete,
  getproductById,
} from "../controllers/productController.js";
import upload from "../servicess/upload.js";
import { authenticateUser } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id",getproductById );
router.post("/", authenticateUser,upload.fields([{ name: "images", maxCount: 5 }]), createProduct);
router.put("/:id", authenticateUser,upload.fields([{ name: "images", maxCount: 5 }]), updateProduct);
router.delete("/:id",authenticateUser, productDelete);

export default router;
