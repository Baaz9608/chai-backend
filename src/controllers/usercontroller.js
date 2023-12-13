import { asyncHandler } from "../utils/asyncHandler";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/usermodel.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";


const generateAcessAndRefreshTokens = async(userId){
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false})

        return {refreshToken, accessToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresha and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user is already exist: username, email
    // check for imges, check for avatar
    // upload them to cloudinary, avatar
    // create user object - creation entry in db
    // remove password and refresh token field from response
    //  check for user creation
    // return res else return false

    const {fullName, email, username, password} = req.body
    console.log('email', email);
} )



const loginUser = asyncHandler( async (req, res)=>{
    // req body -> data
    // username or email
    // find the user
    // password check
    // access and refresh token generate
    // send cookies


    const {email, username, password} = req.body

    if(!username || !email){
        throw new ApiError(400, "username or email is required!")
    }

   const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(404, "User does not exist");
    }
    
    const isPassworedValid = await user.isPasswordCorrect(password)
    if(!isPassworedValid){
        throw new ApiError(401, "Invalid user credentials");
    }

    const {accessToken, refreshToken} = await generateAcessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User loggedIn successfully!"
        )
    )
})

const logoutUser = asyncHandler(async(req, res)=>{
    
})

export {
    registerUser, 
    loginUser
}