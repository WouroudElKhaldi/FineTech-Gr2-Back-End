import express from "express";
import {
  addGoal,
  deleteGoal,
  editGoal,
  getGoalById,
  getGoalsByDate,
  getGoals,
} from "../controller/goalController.js";

const goalRoutes = express.Router();
// Add a goal
goalRoutes.post("/add", addGoal);

// Delete a goal
goalRoutes.delete("/", deleteGoal);

// Edit a goal
goalRoutes.patch("/", editGoal);

// Get all goals
goalRoutes.get("/", getGoals);

// Get a specific goal by ID
goalRoutes.post("/byId", getGoalById);

// Get goals by date
goalRoutes.post("/byDate", getGoalsByDate);

export default goalRoutes;
