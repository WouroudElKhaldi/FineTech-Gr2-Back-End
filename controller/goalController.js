import db from '../models/index.js';

const { GoalModel } = db;



export const addGoal = async (req, res) => {
    try {
      const { target, startDate, endDate, achieved } = req.body;
  
      if (!target || !startDate || !endDate ) {
        throw new Error('Please provide all the required information for adding a goal');
      }
  
      const newGoal = await GoalModel.create({ target, startDate, endDate, achieved });
  
      res.status(200).json({ msg: 'Goal added successfully', data: newGoal });
    } catch (error) {
      console.error('Failed to add goal:', error.message);
      res.status(500).json({ msg: 'Failed', error: error.message });
    }
  };

  export const deleteGoal = async (req, res) => {
    try {
      const id = req.body.id;

      const goal = await GoalModel.findByPk(id);

      if (!goal) {
        return res.status(404).json({
          msg: 'Goal not found',
        });
      }

      await goal.destroy();

      return res.status(200).json({
        msg: 'Goal deleted successfully',
      });
    } catch (error) {
      console.error('Failed to delete goal:', error);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
};


export const getGoal = async (req, res) => {
    try {
      const goalId = req.body.id; 
  
      if (!goalId || isNaN(goalId)) {
        return res.status(400).json({
          msg: 'Invalid goal ID',
        });
      }
  
      const goal = await GoalModel.findByPk(goalId);
  
      if (!goal) {
        return res.status(404).json({
          msg: 'Goal not found',
        });
      }
  
      return res.status(200).json({
        msg: 'Goal retrieved successfully',
        data: goal,
      });
    } catch (error) {
      console.error('Failed to get goal:', error.message);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
  };

export const editGoal = async (req, res) => {
    try {
        const {id, target, startDate, endDate, achieved } = req.body;
  
      if (!id || !target || !startDate || !endDate) {
        return res.status(400).json({
          msg: 'Please provide all the required information for updating the goal',
        });
      }
  
      const [updatedCount] = await GoalModel.update(
        {
          target,
          startDate,
          endDate,
          achieved,
        },
        {
          where: { id },
        }
      );
  
      if (updatedCount === 0) {
        return res.status(404).json({
          msg: 'Goal not found or no changes were made',
        });
      }
  
      const updatedGoal = await GoalModel.findByPk(id);
  
      return res.status(200).json({
        msg: 'Goal updated successfully',
        data: updatedGoal,
      });
    } catch (error) {
      console.error('Failed to edit Goal:', error);
      return res.status(500).json({
        msg: 'Failed',
        error: error.message,
      });
    }
  };