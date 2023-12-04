import express from "express";
import {
  createUser,
  showAllUsers,
  showOneUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controller/userControler.js";
import { upload } from "../middlewares/upload.js";
import { authenticateUser, authorizeUser } from "../middlewares/auth.js";

const userRoutes = express.Router();

// Create a user
userRoutes.post("/create", upload.single("image"), createUser);

// Show all users
userRoutes.get(
  "/view-all",
  authenticateUser,
  authorizeUser(["Admin"]),
  showAllUsers
);

// Show one user
userRoutes.get("/view-one/:id", showOneUser);

// Update a user
userRoutes.patch("/update", upload.single("image"), updateUser);

// Delete a user
userRoutes.delete("/delete", deleteUser);

// Login user
userRoutes.post("/login", loginUser);

export default userRoutes;
