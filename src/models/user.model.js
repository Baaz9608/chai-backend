import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt';
import { Jwt } from "jsonwebtoken";

const usersSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true
        },
        coverimage: {
            type: String, 
            
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Video'
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

usersSchema.pre('save', async function (next){

    if(!this.isModified('password')) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})

usersSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

usersSchema.methods.generateAccessToken = function(){
    return Jwt.sign(
        {
            _id: this._id,
            email : this.email,
            username : this.username,
            fullname : this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

usersSchema.methods.generateRefreshToken = function(){
    return Jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', usersSchema)

// npm -> bcrypt, bcryptjs, jwt