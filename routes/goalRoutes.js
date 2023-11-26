import express from "express";
import { addGoal, deleteGoal, editGoal, getGoalById , getGoalsByDate , getGoals } from "../controller/goalController.js";

const goalRoutes = express.Router();

goalRoutes.post('/add', addGoal);
goalRoutes.delete('/delete',deleteGoal);
goalRoutes.patch('/edit',editGoal)
goalRoutes.get('/get',getGoals)
goalRoutes.get('/get/byId',getGoalById)
goalRoutes.post('/byDate' , getGoalsByDate)

export default goalRoutes;