import { Response, Request, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesService } from "../services/course.service";
import courseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
// import { time } from "console";
import NotificationModel from "../models/notification.model";
import axios from "axios";

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

// edit course
export const editCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(thumbnail.public_id);

        const thumbnailOnCloud = await cloudinary.v2.uploader.upload(
          thumbnail.public_id,
          {
            folder: "Courses",
          }
        );
        data.thumbnail = {
          public_id: thumbnail.public_id,
          url: thumbnail.secure_url,
        };
      }

      const courseId = req.params.id;
      const course = await courseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(201).json({
        success: true,
        course,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Get single course -----without purchasing
export const getSingleCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const isCacheExists = await redis.get(courseId);

      if (isCacheExists) {
        const course = JSON.parse(isCacheExists);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await courseModel
          .findById(courseId)
          .select(
            "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
          );

        await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7 days

        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Get all courses -----without purchasing
export const getAllCourses = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const isCacheExists = await redis.get("allCourses");
      // if (isCacheExists) {
      //   const courses = JSON.parse(isCacheExists);

      //   res.status(200).json({
      //     success: true,
      //     courses,
      //   });
      // } else {
      const courses = await courseModel
        .find()
        .select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );

      await redis.set("allCourses", JSON.stringify(courses), "EX", 604800); // 7 days

      res.status(200).json({
        success: true,
        courses,
      });
      // }
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Get course content --for valid users
export const getCourseByUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;
      const courseExists = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      );

      if (!courseExists) {
        return next(
          new ErrorHandler("You are not authorized to access course", 404)
        );
      }

      const course = await courseModel.findById(courseId);

      const content = course?.courseData;

      res.status(200).json({
        success: true,
        content,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// add questions to the course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId }: IAddQuestionData = req.body;
      const course = await courseModel.findById(courseId);

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      // create a new question object
      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };

      // add this question to the course content
      courseContent.questions.push(newQuestion);

      // send notification
      await NotificationModel.create({
        user: req.user?._id,
        title: "New Question",
        message: `You have a new question on the ${courseContent.title} video, course ${course?.name} from user ${req.user?.name}`,
      });

      // save the update course
      await course?.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// add reply to the question
interface IAddReplyData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export const addReply = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, courseId, contentId, questionId }: IAddReplyData =
        req.body;
      const course = await courseModel.findById(courseId);

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const question = courseContent.questions.find((item: any) =>
        item._id.equals(questionId)
      );

      if (!question) {
        return next(new ErrorHandler("Invalid question id", 400));
      }

      // create a new reply object
      const newReply: any = {
        user: req.user,
        answer,
      };

      // add this reply to the question
      question.questionReplies.push(newReply);

      // save the update course
      await course?.save();

      if (req.user?._id === question.user._id) {
        // create a notification
        await NotificationModel.create({
          user: req.user?._id,
          title: "New reply",
          message: `You have a new reply on the ${courseContent.title} video, course ${course?.name} from user ${req.user?.name}`,
        });
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
        };

        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/reply.ejs"),
          data
        );

        try {
          await sendMail({
            email: question.user.email,
            subject: "New reply to your question",
            template: "reply.ejs",
            data,
          });
        } catch (err: any) {
          return next(new ErrorHandler(err.message, 500));
        }
      }

      res.status(200).json({
        success: true,
        course,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// add review on a course
interface IAddReviewData {
  review: string;
  courseId: string;
  rating: number;
  userId: string;
}

export const addReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      // check if courseId already exists in userCourseList based on _id
      const courseExists = userCourseList?.some(
        (course: any) => course._id.toString() === courseId.toString()
      );

      if (!courseExists) {
        return next(
          new ErrorHandler("You're not eligible to access this course", 404)
        );
      }

      const course = await courseModel.findById(courseId);
      const { review, rating } = req.body as IAddReviewData;

      const reviewData: any = {
        user: req.user,
        comment: review,
        rating,
      };

      course?.reviews.push(reviewData);

      let avg = 0;
      course?.reviews.forEach((item: any) => {
        avg += item.rating;
      });

      if (course) {
        course.rating = avg / course?.reviews.length;
      }

      await course?.save();

      const notification = {
        title: "New Review Added",
        message: `${req.user?.name} has added a review to your course ${course?.name}`,
      };

      // create a notification
      await NotificationModel.create(notification);

      res.status(200).json({
        success: true,
        course,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// add reply to a review
interface IAddReplyToReviewData {
  comment: string;
  courseId: string;
  reviewId: string;
}
export const addReplyToReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId } = req.body as IAddReplyToReviewData;

      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const review = course?.reviews.find((item: any) =>
        item._id.equals(reviewId)
      );
      if (!review) {
        return next(new ErrorHandler("Review not found", 404));
      }

      const replyData: any = {
        user: req.user,
        comment,
      };

      if (!review.commentReplies) {
        review.commentReplies = [];
      }

      review.commentReplies?.push(replyData);

      await course?.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Get all course --- only for admin
export const getAllCoursesForAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res);
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Delete course --- only for admin
export const deleteCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await courseModel.findById(id);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }
      await course.deleteOne({ id }); // remove Course from database
      await redis.del(id); // remove Course from redis cache

      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);

// generate video url
export const generateVideoUrl = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.body;
      const response = await axios.post(
        `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
        { ttl: 300 },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
          },
        }
      );
      res.json(response.data);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
