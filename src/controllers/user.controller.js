// using helper file i.e.,../utils/asyncHandler
// asyncHandler is a higher order function
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // STEPS TO REGISTER A USER
  //step1: getuser details from frontend (we do this through postman by entering the details directly)
  //step2: how we will get user detail depends on how we have designed the model i.e., the userschema)
  //step3: validation- non empty
  //step4: check if already exists through username or email
  //step5: check for images and avatar
  //step6: if present upload to cloudinary & validate if avatar is uploaded successfully or not
  //step7: create user object-create entry in db
  //step8: send response to frontend(remove password &refesh token )
  //step9: check for user creation response i.e., not null
  //step10: send response

  //destructuring
  //     |
  //     |
  //     |
  //     V
  const { fullName, email, username, password } = req.body;
  console.log("email:", email);
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fiels are required");
  }
 const existedUser= User.findOne({
    $or:[{username},{email}]
  })
  if(existedUser){
    throw new ApiError(409 , "User with same email or username already exists");
  }
  //as express provides us with req.body
  // multer provides us with req.files
  const avatarLocalPath=req.files?.avatar[0]?.path;
  const coverImageLocalPath=req.files?.coverImage[0]?.path;
  if(!avatarLocalPath){
    throw new ApiError(400 , "Avatar is required");
  }
  //uploading avatar to cloudinary
  const avatar= await uploadOnCloudinary(avatarLocalPath)
  const coverImage= await uploadOnCloudinary(coverImageLocalPath)
   if( !avatar){
    throw new ApiError(400 , "Avatar is required");
   }
  const user=await User.create({
    fullName,
    avatar : avatar.url,
    coverImage: coverImage?.url||"",
    email,
    password ,
    username:username.toLowerCase()
  })
    const createdUser=await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if(!createdUser){
      throw new ApiError(500 , "error while registering user");
    }
    return res.status(201).json(
      new ApiResponse(200,createdUser,"User registered successfully")
    )
});
export { registerUser };
