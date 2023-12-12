import express from "express";
import {
  addNotification,
  viewAllNotifications,
  deleteNotification,
  paginationNotification,
} from "../controller/notificationController.js";

const notificationRouter = express.Router();

// Add a notification
notificationRouter.post("/add", addNotification);

// Paginate notifications
notificationRouter.get("/paginate-notifications", paginationNotification);

// View all notifications
notificationRouter.get("/view-notifications", viewAllNotifications);

// Delete a notification
notificationRouter.delete("/delete-notification", deleteNotification);

export default notificationRouter;
