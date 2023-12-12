import express from "express";
import {
  addCategory,
  getAllCategories,
  editCategory,
  deleteCategory,
  paginationCategory,
  getCategoriesByType,
} from "../controller/categoryController.js";

const categoryRouter = express.Router();

// Add a category
categoryRouter.post("/add", addCategory);

// Get all categories without pagination
categoryRouter.get("/view-all-categories", getAllCategories);

// Get paginated categories
categoryRouter.get("/paginate-categories", paginationCategory);

// Get categories by type
categoryRouter.post("/view-categories/by-type", getCategoriesByType);

// Edit a category
categoryRouter.patch("/edit-category", editCategory);

// Delete a category
categoryRouter.delete("/delete-category", deleteCategory);

export default categoryRouter;
