import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import LayoutModel from "../models/layout.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import cloudinary from "cloudinary";

export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExists = await LayoutModel.findOne({ type });
      if (isTypeExists) {
        return next(new ErrorHandler(`${type} already exits`, 400));
      }

      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        const banner = {
          type: "Banner",
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };
        await LayoutModel.create(banner);

        if (type === "FAQ") {
          const { faq } = req.body;
          const faqitems = await Promise.all(
            faq.map(async (item: any) => {
              return {
                question: item.question,
                answer: item.answer,
              };
            })
          );
          await LayoutModel.create({ type: "FAQ", faq: faqitems });
        }
        if (type === "Categories") {
          const { categories } = req.body;
          const categoriesItems = await Promise.all(
            categories.map(async (item: any) => {
              return {
                title: item.title,
              };
            })
          );
          await LayoutModel.create({
            type: "Categories",
            categories: categoriesItems,
          });
        }

        res.status(200).json({
          success: true,
          message: "Layout creates Successfully!",
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
