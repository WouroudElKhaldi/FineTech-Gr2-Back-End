import express from "express";
import {
  addCompany,
  deleteCompany,
  editCompany,
  getCompany,
} from "../controller/companyController.js";

const companyRoutes = express.Router();
// Add a company
companyRoutes.post("/add-company", addCompany);

// Delete a company
companyRoutes.delete("/delete-company", deleteCompany);

// Edit a company
companyRoutes.patch("/edit-company", editCompany);

// Get a company
companyRoutes.get("/get-company", getCompany);

export default companyRoutes;
