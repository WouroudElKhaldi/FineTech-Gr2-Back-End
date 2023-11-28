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
calculationRoute.get('/incomeAmount' , sumIncome)
calculationRoute.get('/outcomeAmount' , sumOutcome)
calculationRoute.post('/incomeByCategory' , getIncomeByCategory)
calculationRoute.post('/outcomeByCategory' , getOutcomeByCategory)

export default calculationRoute ;