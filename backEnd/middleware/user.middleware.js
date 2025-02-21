const {verifyToken,decodeToken}=require("../utils/jsonWebToken");

const userAuth=(req,res,next)=>{
    const token=req.headers.authorization;

    try{
        const valid=verifyToken(token);
        const data=decodeToken(token);
        if(valid){
            req.username=data.username;
            req.email=data.email;
            next();
        }
    }catch(error){
        return next(error);
    }
}

module.exports={userAuth};