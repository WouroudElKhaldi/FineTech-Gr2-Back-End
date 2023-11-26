import express from "express";
import {
  createTransaction,
  // getTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getTransactionsByCategory,
  getTransByType,
  getTransactionsByDate
} from "../controller/transactionControler.js";

const transactionRoutes = express.Router();

// // GET all Transaction
transactionRoutes.get("/get", getTransactions);

// // GET a single Transaction
// routransactionRoutester.get("/:id", getTransaction);

// // POST a new Transaction
transactionRoutes.post("/create", createTransaction);

// // DELETE a Transaction
transactionRoutes.delete("/:id", deleteTransaction);

// // // // UPDATE a Transaction
transactionRoutes.patch("/:id", updateTransaction);

// // // // get transaction by  categoryID
transactionRoutes.get(
  "/transactionsByCategory/:categoryId",
  getTransactionsByCategory
);

// get transaction by date 
transactionRoutes.post('/getByDate' , getTransactionsByDate)

//// //// ///  get transaction by Type
transactionRoutes.get("/getByType/:type", getTransByType);

export default transactionRoutes;
