//used to create a wrapper function

//.........used promises
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req,res,next)).catch((error) => next(err));
  };
};








//.......used try catch .....
// const asyncHandler=(fn)=> async (req,re,next)=>{//higher order function->accepts a functionas a parameter
//   try{
//       await fn(req,res,next)
//   }
//   catch(error){
//     res.status(err.code||500).json.({
//         success:false,
//         message: err.message
//     })
//   }
// }

export { asyncHandler };
