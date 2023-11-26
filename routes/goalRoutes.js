import express from "express";
import { addGoal, deleteGoal, editGoal, getGoal } from "../controller/goalController.js";

const goalRoutes = express.Router();

goalRoutes.post('/add', addGoal);
goalRoutes.delete('/delete',deleteGoal);
goalRoutes.patch('/edit',editGoal)
goalRoutes.get('/get',getGoal)

export default goalRoutes;