import db from "../models/index.js";
const {UserModel , TransactionModel} = db ;
import sequelize from 'sequelize';

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
        data: usersByRoleWithPercentage,
      });
    } catch (error) {
      console.error('Failed to get number of users by role:', error);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
};

// transactions 
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
