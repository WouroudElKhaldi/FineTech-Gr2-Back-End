'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notifications.init({
    date: DataTypes.DATE,
    message: DataTypes.STRING,
    transactionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notifications',
  });
  return Notifications;
};