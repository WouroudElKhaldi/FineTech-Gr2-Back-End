import db from "../models/index.js";
import sequelize from 'sequelize';

const { TransactionModel, CategoryModel } = db;

export const getReportInfo = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({
        error: 'Please provide start and end date',
      });
    }

    const transactions = await TransactionModel.findAll({
      where: {
        createdAt: {
          [sequelize.Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: CategoryModel,
          attributes: ['name', 'type'],
        },
      ],
    });

    const incomeTransactions = transactions.filter(
      (transaction) => transaction.type === 'Income'
    );
    const outcomeTransactions = transactions.filter(
      (transaction) => transaction.type === 'Outcome'
    );

    const sumIncome = incomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    const sumOutcome = outcomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Group income transactions by category
    const incomeByCategory = {};
    incomeTransactions.forEach((transaction) => {
      const categoryName = transaction.Category.name;
      incomeByCategory[categoryName] = (incomeByCategory[categoryName] || 0) + transaction.amount;
    });

    // Group outcome transactions by category
    const outcomeByCategory = {};
    outcomeTransactions.forEach((transaction) => {
      const categoryName = transaction.Category.name;
      outcomeByCategory[categoryName] = (outcomeByCategory[categoryName] || 0) + transaction.amount;
    });

    return res.status(200).json({
      incomeTransactions,
      outcomeTransactions,
      sumIncome,
      sumOutcome,
      incomeByCategory,
      outcomeByCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Failed',
      error: error.message,
    });
  }
};
