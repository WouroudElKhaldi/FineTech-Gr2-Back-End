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
goalRoutes.post("/add-goal", addGoal);

// Delete a goal
goalRoutes.delete("/delete-goal", deleteGoal);

// Edit a goal
goalRoutes.patch("/edit-goal", editGoal);

// Get all goals
goalRoutes.get("/get-goals", getGoals);

// Get a specific goal by ID
goalRoutes.get("/get-goal-by-id", getGoalById);

// Get goals by date
goalRoutes.post("/get-goals-by-date", getGoalsByDate);

export default goalRoutes;
