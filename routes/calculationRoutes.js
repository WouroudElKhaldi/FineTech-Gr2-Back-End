import express from "express";
import {
  getTotalUsers,
  getUsersByRole,
  sumOutcome,
  sumIncome,
  calculateProfit,
  getIncomeByCategory,
  getOutcomeByCategory,
} from "../controller/calculationController.js";

const calculationRoute = express.Router();

calculationRoute.get("/total-users", getTotalUsers);
calculationRoute.get("/users-by-role", getUsersByRole);
calculationRoute.post("/calculate-profit", calculateProfit);
calculationRoute.get("/sum-income", sumIncome);
calculationRoute.get("/sum-outcome", sumOutcome);
calculationRoute.post("/income-by-category", getIncomeByCategory);
calculationRoute.post("/outcome-by-category", getOutcomeByCategory);

export default calculationRoute;
