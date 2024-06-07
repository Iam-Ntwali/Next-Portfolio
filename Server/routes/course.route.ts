import express from "express";
import {
  addQuestion,
  addReply,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAllCourses,
  getAllCoursesForAdmin,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

// course routes
const courseRouter = express.Router();

// Create a new course
courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

// Edit a course by ID
courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);

// Get a course by ID
courseRouter.get("/get-course/:id", getSingleCourse);

// Get all courses -- without purchase
courseRouter.get("/get-courses", getAllCourses);

// Get all course in the database
courseRouter.get(
  "/get-all-courses",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCoursesForAdmin
);

// Get users purchased courses
courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseByUser);

// Add a comment to a course
courseRouter.put("/add-question", isAuthenticated, addQuestion);

// Add a reply to a comment on a course
courseRouter.put("/add-reply", isAuthenticated, addReply);

// Add a review to a course
courseRouter.put("/add-review/:id", isAuthenticated, addReview);

// Reply tp a review on Admin
courseRouter.put(
  "/add-reply-to-review",
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview
);

// Secure vids routes
courseRouter.post("/getVdoCipherOTP", generateVideoUrl);

// Delete a course from the database
courseRouter.delete(
  "/delete-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCourse
);

export default courseRouter;
