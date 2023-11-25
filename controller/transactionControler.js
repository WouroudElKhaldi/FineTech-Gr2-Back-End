// // Import necessary modules and models
import db from "../models/index.js";

const { TransactionModel, UserModel, CategoryModel } = db;

///// add transaction
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

//////// Function to fetch all Transaction with their authors and categories
export const getTransactions = async (req, res) => {
  try {
    // pagination
    const { page = 1, pageSize = 5 } = req.query;
    const offset = (page - 1) * pageSize;

    const gettransactions = await TransactionModel.findAll({
      include: [UserModel, CategoryModel],
      //pagination
      offset,
      limit: parseInt(pageSize),
    });
    res.status(200).json(gettransactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete transaction
export const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteTransaction = await TransactionModel.findByPk(id);
    if (!deleteTransaction) {
      return res.status(404).json({ message: "transaction not found" });
    }

    await deleteTransaction.destroy();
    res.status(200).json({ message: "transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update transaction
export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { type, date, amount, userId, categoryId } = req.body;
  try {
    const UpdateTransaction = await TransactionModel.findByPk(id);
    if (!UpdateTransaction) {
      return res.status(404).json({ message: "transaction not found" });
    }

    await UpdateTransaction.update({
      type,
      date,
      amount,
      userId,
      categoryId,
    });
    res.status(200).json({ message: "transaction updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//// // // // get transaction by  categoryID
export const getTransactionsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const { page = 1, pageSize = 5 } = req.query;
    const offset = (page - 1) * pageSize;

    const transactions = await TransactionModel.findAll({
      where: { categoryId: categoryId },
      include: [UserModel, CategoryModel],
      offset,
      limit: parseInt(pageSize),
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//// // // // get transaction by  category Type
export const getTransByType = async (req, res) => {
  const { type } = req.params;

  try {
    const { page = 1, pageSize = 5 } = req.query;
    const offset = (page - 1) * pageSize;

    const transactions = await TransactionModel.findAll({
      where: { type: type },
      include: [UserModel, CategoryModel],

      offset,
      limit: parseInt(pageSize),
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
