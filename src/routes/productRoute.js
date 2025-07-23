import express from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  productDelete,
  getproductById,
} from "../controllers/productController.js";
import upload from "../servicess/upload.js";
import { verifyTokenWithRefresh} from '../middlewares/authMiddleware.js';


const router = express.Router();

router.get("/",verifyTokenWithRefresh , getAllProducts);
router.get("/:id",verifyTokenWithRefresh,getproductById );
router.post("/", verifyTokenWithRefresh,upload.fields([{ name: "images", maxCount: 5 }]), createProduct);
router.put("/:id", verifyTokenWithRefresh,upload.fields([{ name: "images", maxCount: 5 }]), updateProduct);
router.delete("/:id",verifyTokenWithRefresh, productDelete);

export default router;
