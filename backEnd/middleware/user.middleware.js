const {verifyToken,decodeToken}=require("../utils");

const userAuth=(req,res,next)=>{
    const token=req.headers.authorization;

    try{
        const valid=verifyToken(token);
        const data=decodeToken(token);
        if(valid){
            req.username=data.username;
            next();
        }
    }catch(error){
        next(error);
    }
}

module.exports={userAuth};