import ejs from 'ejs';
import { CatchAsyncError } from '../middleware/catchAsyncErrors';
import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/ErrorHandler';
import { IOrder } from '../models/order.model';
import userModel from '../models/user.model';
import CourseModel from '../models/course.model';
import { newOrder } from '../services/order.services';
import path from 'path';
import sendMail from '../utils/sendMail';
import { Types } from 'mongoose';
import NotificationModel from '../models/notification.model';


// create order


export const createOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId, payment_info } = req.body as IOrder;

        const user = await userModel.findById(req.user?._id);

        const courseExistInUser = user?.courses.some((course: any) => course._id.toString() === courseId);

        if (courseExistInUser) {
            return next(new ErrorHandler("You already have purchased the Course", 400));
        }

        const course = await CourseModel.findById(courseId);

        if (!course) {
            return next(new ErrorHandler("Course Not Found", 404));
        }

        const data: any = {
            courseId: course._id,
            userId: user?._id,
            payment_info
        };

        newOrder(data, res, next);

        const mailData = {
            order: {
                _id: (course._id as string).slice(0, 6),
                name: course.name,
                price: course.price,
                data: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            }
        }

        const html = await ejs.renderFile(path.join(__dirname, '../mails/order-confirmation.ejs'), { order: mailData });

        try {
            if (user) {
                await sendMail({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-confirmation.ejs",
                    data: mailData,
                })
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }

        const courseIdStr = (course._id as Types.ObjectId).toString();

        if (user) {
            user.courses.push({ courseId: courseIdStr });
            await user.save(); // don’t forget to save
        }

       await NotificationModel.create({
            user: user?._id,
            title: "New Order",
            message: `You have a new order from ${course?.name}`,
        });

        
            course.purchased ? course.purchased +=1 : course.purchased;
          
        
        await course.save();

        newOrder(data,res,next);

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})