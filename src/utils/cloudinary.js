// this utility will help to upload files on the server side
// STEP1: using multer upload file from user to local temporarily so that we get a chance of reupload
// STEP2: using cloudinary upload from local to server
// cloudinary is just a service (sdk) like aws
// it will be provided with a url
import { v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadOnCloudinary=async(localFilePath)=>{
    try{
       if(!localFilePath) return null
       //upload file on cloudinary
      const response=await cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto"
       })
       //file uploaded successfully
       console.log("file is uploaded ",response.url);
       return response;
    }
    catch(error){
          fs.unlinkSync(localFilePath)//remove the locally saved temporaryfile as the upload operation got failed
          return null;
    }
}
export {uploadOnCloudinary}