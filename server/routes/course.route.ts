import express from "express";
import { authorizedRoles, isAutheticated } from "../middleware/auth";
import {
  addAnswer, addQuestion,
  editCourse, getAllCourse,
  getCourseByUser, getSingleCourse,
  uploadCourse
} from "../controllers/course.controller";

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

courseRouter.get(
  "/get-course/:id",
  getSingleCourse
);

courseRouter.get(
  "/get-courses",
  getAllCourse,
);

courseRouter.get(
  "/get-course-content/:id",
  isAutheticated,
  getCourseByUser,
);

courseRouter.put(
  "/add-question",
  isAutheticated,
  addQuestion,
);

courseRouter.put(
  "/add-answer",
  isAutheticated,
  addAnswer,
);



export default courseRouter;
