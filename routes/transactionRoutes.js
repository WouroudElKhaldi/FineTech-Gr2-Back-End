import express from "express";
import {
  createTransaction,
  // getTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getTransactionsByCategory,
  getTransByType,
  getTransactionsByDate,
} from "../controller/transactionControler.js";

const transactionRoutes = express.Router();

// GET all transactions
transactionRoutes.get("/view-trans", getTransactions);

// GET transactions by categoryID
transactionRoutes.post("/view-by-category/", getTransactionsByCategory);

// GET transactions by date
transactionRoutes.post("/view-by-date", getTransactionsByDate);

// GET transactions by type
transactionRoutes.post("/view-by-type", getTransByType);

// POST a new transaction
transactionRoutes.post("/add", createTransaction);

// DELETE a transaction
transactionRoutes.delete("/delete", deleteTransaction);

// UPDATE a transaction
transactionRoutes.patch("/edit", updateTransaction);

export default transactionRoutes;
