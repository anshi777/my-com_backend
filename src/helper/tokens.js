import AuthModel from "../models/authModel.js"
import { ApiError } from "../utils/ApiError.js"

const generateAccessAndRefreshToken = async(userId)=>{
    try {
        
const user = await AuthModel.findById(userId)

const accessToken = user.generateAccessToken()
const refreshToken =user.generateRefreshToken()
user.refreshToken =refreshToken;
await user.save({validateBeforeSave:false});

return{accessToken,refreshToken}

    } catch (error) {

        throw new ApiError(500,'Something went wrong while generating access and refresh token...',error)
    }
}
export {generateAccessAndRefreshToken}
