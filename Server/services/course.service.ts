import { Response } from "express";
import courseModel from "../models/course.model";
import { catchAsyncError } from "../middleware/catchAsyncErrors";

// create a new course
export const createCourse = catchAsyncError(
  async (data: any, res: Response) => {
    const course = await courseModel.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  }
);
