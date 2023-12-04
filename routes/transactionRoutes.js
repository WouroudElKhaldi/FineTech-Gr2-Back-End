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
transactionRoutes.get("/view-all", getTransactions);

// GET transactions by categoryID
transactionRoutes.get(
  "/view-by-category/:categoryId",
  getTransactionsByCategory
);

// GET transactions by date
transactionRoutes.post("/view-by-date", getTransactionsByDate);

// GET transactions by type
transactionRoutes.get("/view-by-type/:type", getTransByType);

// POST a new transaction
transactionRoutes.post("/add", createTransaction);

// DELETE a transaction
transactionRoutes.delete("/delete/:id", deleteTransaction);

// UPDATE a transaction
transactionRoutes.patch("/edit/:id", updateTransaction);

export default transactionRoutes;
