import { Response, Request, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse } from "../services/course.service";

// upload course
export const uploadCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const thumbnailOnCloud = await cloudinary.v2.uploader.upload(
          thumbnail,
          { folders: "Courses" }
        );
        data.thumbnail = {
          public_id: thumbnailOnCloud.public_id,
          url: thumbnailOnCloud.secure_url,
        };
      }
      createCourse(data, res, next);
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
