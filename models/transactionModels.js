import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db";

//create a model called books which is a table in db with this name
const Transaction = sequelize.define("transactions", {
  type: {
    type: DataTypes.ENUM,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
  amount: {
    type: DataTypes.BIGINT,
  },
  userid: {
    type: DataTypes.BIGINT,
  },
  categoryid: {
    type: DataTypes.BIGINT,
  },
});

//add the transactions model to your database

sequelize
  .sync()
  .then(() => {
    console.log("Book table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
export default Transaction;
