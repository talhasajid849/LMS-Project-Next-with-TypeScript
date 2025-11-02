import mongoose, {Document, Model, Schema, Types} from "mongoose";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document{
    _id: Types.ObjectId | string;
    name: string;
    email: string;
    password: string;
    avatar:{
        public_id: string;
        url:string;
    },
    role: string;
    isVerified: boolean;
    courses: Array<{courseId: string}>;
    comparePassword: (password: string) => Promise<boolean>;
    SignAccessToken: () => string;
    SignRefreshToken: () => string;
};

const userSchemna: Schema<IUser> = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function(value:string){
                return emailRegexPattern.test(value);
            },
            message: "Please enter a valid email",
        },
        unique: true,
    },
    password:{
        type:String,
        minLength: [6, "Passeord must be the at least 6 character"],
        select: false,
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role:{
        type:String,
        default: "user",
    },
    isVerified:{
        type:Boolean,
        default: false,
    },
    courses:[
        {
            courseId:String,
        }
    ]
}, {timestamps:true});

//Hash Password before SAving
userSchemna.pre<IUser>('save', async function(next){
    if(!this.isModified('password')){
       return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})


// compair password 
userSchemna.methods.comparePassword = async function(enteredPassword:string): Promise<boolean>{
    return await bcrypt.compare(enteredPassword, this.password);
}

// sign access token
userSchemna.methods.SignAccessToken = function () {
    return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN || '', {
        expiresIn: "5m",
    })
}

// sign refresh token
userSchemna.methods.SignRefreshToken = function () {
    return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN || '', {
        expiresIn: "3d",
    })

}

const userModel: Model<IUser> = mongoose.model("LMS_user", userSchemna);

export default userModel;