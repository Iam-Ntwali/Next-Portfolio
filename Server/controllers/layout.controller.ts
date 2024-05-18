import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import LayoutModel from "../models/layout.model";
import cloudinary from "cloudinary";

// create layout manager
export const createLayout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist = await LayoutModel.findOne({ type });

      if (isTypeExist) {
        return next(new ErrorHandler(`${type} already exist`, 400));
      }

      if (type === "Banner") {
        const { title, subtitle, image } = req.body;
        const cloudImage = await cloudinary.v2.uploader.upload(image, {
          folder: "Layout",
        });

        const banner = {
          title,
          subtitle,
          image: {
            public_id: cloudImage.public_id,
            url: cloudImage.secure_url,
          },
        };

        await LayoutModel.create(banner);
      }

      if (type === "FAQ") {
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await LayoutModel.create({ type: "FAQ", faq: faqItems });
      }

      if (type === "Categories") {
        const { categories } = req.body;

        await LayoutModel.create(categories);
      }

      res.status(200).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (err: any) {
      next(new ErrorHandler(err.message, 500));
    }
  }
);
