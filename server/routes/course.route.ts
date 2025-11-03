import express from "express";
import { authorizedRoles, isAutheticated } from "../middleware/auth";
import { editCourse, uploadCourse } from "../controllers/course.controller";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAutheticated,
  authorizedRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAutheticated,
  authorizedRoles("admin"),
  editCourse
);



export default courseRouter;
