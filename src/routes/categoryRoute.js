import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { verifyTokenWithRefresh  } from "../middlewares/authMiddleware.js";

const route = Router();

route.post("/",verifyTokenWithRefresh, createCategory);
route.get("/", verifyTokenWithRefresh ,getAllCategory);
route.put("/:id",verifyTokenWithRefresh, updateCategory);
route.delete("/:id", verifyTokenWithRefresh,deleteCategory);

export default route;
