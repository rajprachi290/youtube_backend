import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
//we use multer to handle files (inmages)
const router=Router()
router.route("/register").post(
    upload.fields([
        // injecting middleware by importing multer 
        {name:"avatar",maxCount:1},
        {name:"coverImage",maxCount:1}
    ]),
    registerUser
)

export default router;