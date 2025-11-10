import express from "express";
import { authorizedRoles, isAutheticated } from "../middleware/auth";
import {
  getCoursesAnalytics,
  getOrdersAnalytics,
  getUserAnalytics,
} from "../controllers/analytics.controller";
const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-users-analytics",
  isAutheticated,
  authorizedRoles("admin"),
  getUserAnalytics
);

analyticsRouter.get(
  "/get-orders-analytics",
  isAutheticated,
  authorizedRoles("admin"),
  getOrdersAnalytics
);

analyticsRouter.get(
  "/get-courses-analytics",
  isAutheticated,
  authorizedRoles("admin"),
  getCoursesAnalytics
);

export default analyticsRouter;
