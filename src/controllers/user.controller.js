// using helper file i.e.,../utils/asyncHandler
// asyncHandler is a higher order function
import {asyncHandler} from "../utils/asyncHandler.js"
const registerUser= asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:"done"
    })
})
export {registerUser}