import express from "express";
import { createCategory, deleteCategoryById, getCategories, showCategoryById, updateCategoryById } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.get("/:id", showCategoryById);
router.put("/:id", updateCategoryById);
router.delete("/:id", deleteCategoryById);

export default router;