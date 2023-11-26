import express from "express";
import {
    getTotalUsers,
    getUsersByRole,
    sumOutcome,
    sumIncome
} from '../controller/calculationController.js'


const calculationRoute = express.Router() 

calculationRoute.get('/users/num' , getTotalUsers)
calculationRoute.get('/users/role' , getUsersByRole)

calculationRoute.get('/IncomeAmount' , sumIncome)
calculationRoute.get('/OutcomeAmount' , sumOutcome)

export default calculationRoute ;