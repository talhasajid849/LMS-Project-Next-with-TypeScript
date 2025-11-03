import { app } from "./app"
import dotenv from 'dotenv';
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./utils/db";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.CLOUD_API_KEY as string,
  api_secret: process.env.CLOUD_SECRET_KEY as string, 
});



// create server
app.listen(process.env.PORT, () => {
    console.log(`Server is connected with ${process.env.PORT} `)
    connectDB();
});