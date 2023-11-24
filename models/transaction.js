import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.UserModel);
      Transaction.belongsTo(models.CategoryModel);
    }
  }
  Transaction.init(
    {
      type: DataTypes.ENUM("Income", "Outcome"),
      date: DataTypes.DATE,
      amount: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
