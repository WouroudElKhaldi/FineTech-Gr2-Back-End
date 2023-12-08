import db from "../models/index.js";
const {UserModel , TransactionModel , CategoryModel , CompanyModel} = db ;
import sequelize from 'sequelize';

// users number in total 
export const getTotalUsers = async (req , res) => {
    try{
        const totalUsers = await UserModel.count() ;
        return res.status(200).json({
            msg: 'Fetched total number of users successfully',
            data : {
                totalUsers : totalUsers
            }
        })
    }catch(error) {
        console.error('Failed to get total number of users:', error);
        return res.status(500).json({
          msg: 'Failed',
          error: error.message,
        });
    }
}

// users number by role
export const getUsersByRole = async (req, res) => {
    try {
      const userStats = await UserModel.findAll({
        attributes: ['role', [sequelize.fn('COUNT', sequelize.literal('1')), 'count']],
        group: ['role'],
      });
  
      // Calculate percentages
      const totalUsers = userStats.reduce((acc, role) => acc + role.dataValues.count, 0);
      const usersByRoleWithPercentage = userStats.map((role) => ({
        role: role.role,
        count: role.dataValues.count,
        percentage: (role.dataValues.count / totalUsers) * 100,
      }));
  
      return res.status(200).json({
        msg: 'Fetched number of users by role successfully',
        data: usersByRoleWithPercentage,totalUsers
      });
    } catch (error) {
      console.error('Failed to get number of users by role:', error);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
};

// transactions total income
export const sumIncome = async (req, res) => {
  try {
    const Trans = await TransactionModel.sum('amount')
    const totalIncome = await TransactionModel.sum('amount', {
      where: { type: 'Income' },
    });

    const totalTransactions = await TransactionModel.sum('amount');

    const incomePercentage = totalTransactions === 0 ? 0 : (totalIncome / totalTransactions) * 100;

    return res.status(200).json({
      msg: 'Summed all income amount with percentage successfully',
      data: {
        totalTransactions : Trans ,
        totalIncome: totalIncome || 0,
        incomePercentage: incomePercentage,
      },
    });
  } catch (error) {
    console.error('Failed to sum income amount with percentage:', error);
    return res.status(500).json({
      msg: 'Failed',
      error: error.message,
    });
  }
};

// total outcome 
export const sumOutcome = async (req, res) => {
  try {
    const Trans = await TransactionModel.sum('amount')
    const totalOutcome = await TransactionModel.sum('amount', {
      where: { type: 'Outcome' },
    });

    const totalTransactions = await TransactionModel.sum('amount');

    const outcomePercentage = totalTransactions === 0 ? 0 : (totalOutcome / totalTransactions) * 100;

    return res.status(200).json({
      msg: 'Summed all outcome amount with percentage successfully',
      data: {
        totalTransactions : Trans ,
        totalOutcome: totalOutcome || 0,
        outcomePercentage: outcomePercentage,
      },
    });
  } catch (error) {
    console.error('Failed to sum outcome amount with percentage:', error);
    return res.status(500).json({
      msg: 'Failed',
      error: error.message,
    });
  }
};

// profit 
export const calculateProfit = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    if (!startDate || !endDate) {
      return res.status(400).json({
        error: 'Please provide start date and end date',
      });
    }
    const company = await CompanyModel.findByPk(1) 
    const transactions = await TransactionModel.findAll({
      where: {
        createdAt: {
          [sequelize.Op.between]: [startDate, endDate],
        },
      },
    });

    const totalIncome = transactions.reduce(
      (sum, transaction) =>
        transaction.type === 'Income' ? sum + transaction.amount : sum,
      0
    );

    const totalOutcome = transactions.reduce(
      (sum, transaction) =>
        transaction.type === 'Outcome' ? sum + transaction.amount : sum,
      0
    );

    const profit = totalIncome - totalOutcome;
    const pureProfit = 0.1 * profit 
    const capitalNow = company.capital + pureProfit 

    return res.status(200).json({
      totalIncome,
      totalOutcome,
      profit,
      pureProfit ,
      capitalNow
    });
  } catch (error) {
    console.error('Error calculating profit:', error);
    return res.status(500).json({
      msg: 'Failed',
      error: error,
    });
  }
};

// income by category 
export const getIncomeByCategory = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    if (!startDate || !endDate) {
      return res.status(400).json({
        error: 'Please provide start date and end date',
      });
    }

    // Get income transactions with categories
    const incomeTransactions = await TransactionModel.findAll({
      where: {
        type: 'Income',
        date: {
          [sequelize.Op.between]: [startDate, endDate],
        },
      },
      include: [{ model: CategoryModel, where: { type: 'Income' } }],
    });

    // Calculate percentage of income by category
    const incomeByCategory = {};
    incomeTransactions.forEach((transaction) => {
      const categoryName = transaction.Category.name;
      incomeByCategory[categoryName] =
        (incomeByCategory[categoryName] || 0) + transaction.amount;
    });

    const totalIncome = incomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    return res.status(200).json({
      incomeByCategory,
      totalIncome,
    });
  } catch (error) {
    console.error('Error calculating income by category:', error);
    return res.status(500).json({
      msg: 'Failed',
      error: error,
    });
  }
};


// outcome by category 
export const getOutcomeByCategory = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    if (!startDate || !endDate) {
      return res.status(400).json({
        error: 'Please provide start date and end date',
      });
    }

    // Get outcome transactions with categories
    const outcomeTransactions = await TransactionModel.findAll({
      where: {
        type: 'Outcome',
        date: {
          [sequelize.Op.between]: [startDate, endDate],
        },
      },
      include: [{ model: CategoryModel, where: { type: 'Outcome' } }],
    });

    // Calculate percentage of outcome by category
    const outcomeByCategory = {};
    outcomeTransactions.forEach((transaction) => { 
      const categoryName = transaction.Category.name;
      outcomeByCategory[categoryName] =
        (outcomeByCategory[categoryName] || 0) + transaction.amount;
    });

    const totalOutcome = outcomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    return res.status(200).json({
      outcomeByCategory,
      totalOutcome,
    });
  } catch (error) {
    console.error('Error calculating outcome by category:', error);
    return res.status(500).json({
      msg: 'Failed',
      error: error,
    });
  }
};