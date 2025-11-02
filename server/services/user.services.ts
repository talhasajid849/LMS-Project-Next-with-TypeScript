import { Response } from "express";
import userModel from "../models/user.model"
import { Types } from "mongoose";


// get user by id
export const getUserById = async (id: string | Types.ObjectId, res:Response) => {
    const user = await userModel.findById(id);
     res.status(201).json({
        success:true,
        user,
     })
}