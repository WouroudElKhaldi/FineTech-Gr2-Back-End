import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db";
export const createTransaction = async (req, res) => {
  let { type, date, amount, userid, categoryid } = req.body;
  sequelize
    .sync()
    .then(() => {
      console.log("transaction table created successfully!");

      Transaction.create({
        type,
        date,
        amount,
        userid,
        categoryid,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error("Failed to create a new record : ", error);
        });
    })
    .catch((error) => {
      console.error("Unable to create table : ", error);
    });
};
