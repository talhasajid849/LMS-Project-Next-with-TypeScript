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

// parse enviroment variable integrastion with fallback values
  const accessToknExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
    const REFRESHToknExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10);

    // ooption for cookies
  export  const accessTokenOption: ITokenOptions = {
        expires: new Date(Date.now() + accessToknExpire * 60 * 60 * 1000),
        maxAge: accessToknExpire * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax'
    }


    export  const refreshTokenOption: ITokenOptions = {
        expires: new Date(Date.now() + REFRESHToknExpire * 24 * 60 * 60 * 1000),
        maxAge: REFRESHToknExpire * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax'
    }


export const sendToken = (user:IUser, statusCode: number, res:Response) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    // upload session to redis
    redis.set(user._id.toString(), JSON.stringify(user) as any);

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