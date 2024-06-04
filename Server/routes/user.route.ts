import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

// Create user
userRouter.post("/registration", registrationUser);

// Activate user
userRouter.post("/activate-user", activateUser);

// Login user
userRouter.post("/login", loginUser);

// Logout user
userRouter.get("/logout", isAuthenticated, logoutUser);

// Refresh access token
userRouter.get("/refresh", updateAccessToken);

// Social auth login
userRouter.post("/social-auth", socialAuth);

// Get user info
userRouter.get("/user-info", isAuthenticated, getUserInfo);

// Update user info
userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);

// Update user password
userRouter.put("/update-user-password", isAuthenticated, updatePassword);

// Update user avatar
userRouter.put("/update-user-avatar", isAuthenticated, updateProfilePicture);

// Get all users in DB
userRouter.get(
  "/get-all-users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

// Update user role
userRouter.put(
  "/update-user-role",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);

// Delete user
userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default userRouter;
