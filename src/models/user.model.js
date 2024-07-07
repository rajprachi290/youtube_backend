import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [{ type:Schema.Types.ObjectId, ref: "Video" }],
    password: {
      //password shouldn't be in string
      // use bcrypt to hash the password
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      // what...?
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// 9->30:30 (IMPORTANT)
//used to encrypt password only when password is being updated
//here 'pre' is a middleware and
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// here we don't use arrow function because 'this' inside the function refers to the instance of the model (the document) that the method is being called on.
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this.id,
      // email:this.email,
      // username:this.username,
      // fullName:this.fullName
    },
    process.env.A_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const User = mongoose.model("User", userSchema);
// jwt has 3 parts-header(signing algo),
//                -payload(data)
//                -signature
