'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    DOB: DataTypes.DATE,
    password: DataTypes.STRING,
    emai: DataTypes.STRING,
    role: DataTypes.ENUM,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};