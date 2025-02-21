
const globalCatch=(error,req,res,next)=>{
    let message=error.message ? error.message : error; 
    let statusCode=error.statusCode || 500;
    res.status(statusCode).json({error:message});
};

module.exports=globalCatch;
