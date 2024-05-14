import { NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import OrderModel from "../models/order.model";

// create a new order
export const newOrder = catchAsyncError(
  async (data: any, next: NextFunction) => {
    const order = await OrderModel.create(data);
    next(order);
  }
);
