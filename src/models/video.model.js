//Mongoose aggregation refers to the process of performing complex data processing and transformation operations on MongoDB collections
// using the Mongoose library in Node.js. 
// Aggregation operations allow you to perform a variety of tasks such as filtering, grouping, sorting, reshaping, and transforming data. 

import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema=new Schema({
    videoFile:{
        type:String,
        required:true
    },
    thumbNail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})
videoSchema.plugin
export const Video=mongoose.model("Video",videoSchema)