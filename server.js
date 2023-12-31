// In your main application file (e.g., server.js)
import sequelize from "./config/db.js";
import express from "express";
import router from "./routes/transactionRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import calculationRoute from "./routes/calculationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only your frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())
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
app.use("/companies", companyRoutes);
app.use("/goals", goalRoutes);
app.use("/api/auth", userRoutes);
app.use("/transactions", transactionRoutes);
app.use("/notifications", notificationRouter);
app.use("/categories", categoryRouter);
app.use("/calculations", calculationRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
