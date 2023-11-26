import express from "express";
import {
  addCategory,
  getAllCategories,
  editCategory,
  deleteCategory,
  paginationCategory,
  getCategoriesByType ,
} from '../controller/categoryController.js';

const categoryRouter = express.Router();

// Add a category
categoryRouter.post('/add', addCategory);

// Get all categories without pagination
categoryRouter.get('/view', getAllCategories);

// Get paginated categories
categoryRouter.get('/paginate', paginationCategory);

// Get categories by type 
categoryRouter.get('/view/byType/:type', getCategoriesByType);

// Edit a category
categoryRouter.patch('/edit', editCategory);

// Delete a category 
categoryRouter.delete('/delete', deleteCategory);

export default categoryRouter; 
