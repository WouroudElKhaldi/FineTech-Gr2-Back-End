import express from "express";
import {
  createTransaction,
  // getTransaction,
  // getTransactions,
  // deleteTransaction,
  // updateTransaction,
} from "../controller/transactionControler.js";

const router = express.Router();

// // GET all Transaction
// router.get("/", getTransactions);

// // GET a single Transaction
// router.get("/:id", getTransaction);

// // POST a new Transaction
router.post("/create", createTransaction);

// // DELETE a Transaction
// router.delete("/:id", deleteTransaction);

// // // // UPDATE a category
// router.patch("/:id", updateTransaction);

export default router;
