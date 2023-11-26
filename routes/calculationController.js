import express from "express";
import {
    getTotalUsers,
    getUsersByRole,
    sumOutcome,
    sumIncome ,
    calculateProfit ,
    getIncomeByCategory,
    getOutcomeByCategory
} from '../controller/calculationController.js'


const calculationRoute = express.Router() 

calculationRoute.get('/users/num' , getTotalUsers)
calculationRoute.get('/users/role' , getUsersByRole)
calculationRoute.post('/profit' , calculateProfit)
calculationRoute.get('/IncomeAmount' , sumIncome)
calculationRoute.get('/OutcomeAmount' , sumOutcome)
calculationRoute.post('/IncomeByCategory' , getIncomeByCategory)
calculationRoute.post('/OutcomeByCategory' , getOutcomeByCategory)

export default calculationRoute ;