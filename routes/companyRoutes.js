import express from "express";
import { addCompany, deleteCompany, editCompany, getCompany } from "../controller/companyController.js";

const companyRoutes = express.Router();

companyRoutes.post('/add', addCompany);
companyRoutes.delete('/delete',deleteCompany);
companyRoutes.patch('/edit',editCompany)
companyRoutes.get('/get',getCompany)

export default companyRoutes;

