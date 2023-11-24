import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.TransactionModel, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.ENUM("Income", "Outcome"),
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
