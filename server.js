// In your main application file (e.g., server.js)
import sequelize from "./config/db.js";
import express from "express";
import router from "./routes/transactionRoutes.js";


const app = express();

app.use(express.json());

// Sync the models only once when the application starts
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((error) => {
    console.error("Failed to synchronize database: ", error);
  });

app.use("/transactions", router);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
