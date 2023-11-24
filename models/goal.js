import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Goal.init(
    {
      target: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      achieved: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Goal",
    }
  );
  return Goal;
};
