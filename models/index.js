import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import Transaction from "./transaction.js";
import Category from "./category.js";
import User from "./user.js";
import Goal from "./goal.js";
import Company from "./company.js";
import notification from "./notification.js";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const UserModel = User(sequelize, Sequelize);
const CategoryModel = Category(sequelize, Sequelize);
const TransactionModel = Transaction(sequelize, Sequelize);
const NotificationModel = notification(sequelize , Sequelize);
const CompanyModel = Company(sequelize, Sequelize);
const GoalModel = Goal(sequelize, Sequelize);

const db = {
  sequelize,
  Sequelize,
  UserModel,
  CategoryModel,
  TransactionModel,
  CompanyModel,
  GoalModel,
  NotificationModel,
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
export default db;
