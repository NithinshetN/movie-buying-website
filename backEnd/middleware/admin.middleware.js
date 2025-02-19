const {verifyToken,decodeToken}=require("../utils/jsonWebToken");
const Admin=require("../models/admin.models");

const adminAuth=(req,res,next)=>{
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

module.exports={adminAuth};