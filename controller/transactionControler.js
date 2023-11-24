// // Import necessary modules and models
import db from "../models/index.js";

const { TransactionModel } = db;

export const createTransaction = async (req, res) => {
  try {
    // Destructure data from request body
    const { type, date, amount, userId, categoryId } = req.body;

    // Create a new transaction record
    const newTransaction = await TransactionModel.create({
      type,
      date,
      amount,
      userId,
      categoryId,
    });

    console.log("Transaction created successfully:", newTransaction);

    // Respond with a success message
    res.status(201).json({
      message: "Transaction created successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Failed to create a new record: ", error);

    // Respond with an error message
    res.status(500).json({ error: "Internal Server Error" });
  }
};
