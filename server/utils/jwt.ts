import dotenv from 'dotenv'
import { IUser } from '../models/user.model'
import { redis } from './redis'
import { Response } from 'express';


dotenv.config();


interface ITokenOptions {
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: 'lax' | 'strict' | 'none' | undefined;
    secure?: boolean;
}


export const sendToken = (user:IUser, statusCode: number, res:Response) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    // upload session to redis
    redis.set(user._id.toString(), JSON.stringify(user) as any);


    // parse enviroment variable integrastion with fallback values
    const accessToknExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
    const REFRESHToknExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10);

    // ooptioj for cookies
    const accessTokenOption: ITokenOptions = {
        expires: new Date(Date.now() + accessToknExpire * 1000),
        maxAge: accessToknExpire * 1000,
        httpOnly: true,
        sameSite: 'lax'
    }


     const refreshTokenOption: ITokenOptions = {
        expires: new Date(Date.now() + REFRESHToknExpire * 1000),
        maxAge: REFRESHToknExpire * 1000,
        httpOnly: true,
        sameSite: 'lax'
    }

    // only set the secure to true in production 
    if(process.env.NODE_ENV === 'production'){
        accessTokenOption.secure = true;
    }

    res.cookie("access_token", accessToken, accessTokenOption);
    res.cookie("refresh_token", refreshToken, refreshTokenOption);

    res.status(statusCode).json({
        success: true,
        user,
        accessToken
    })
}