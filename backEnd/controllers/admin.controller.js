const Admin=require("../models/admin.models.js");
const {validateAdmin}=require("../validations/admin.validation");
const {hashedPassword,comparePassword}=require("../utils/passwordHash");
const {generateToken}=require("../utils/jsonWebToken");
const { adminExists } = require("../services/admin.services");

//controller to signup admin
async function adminSignup(req,res,next){
    const data=req.body;
    const validation=validateAdmin(data).success;
    if(!validation){
        return next(validateAdmin.error.errors[0].message);
    }else if(await adminExists(data)){
        return next("Admin Exists");
    }
    
    const signupData=await new Admin(data);
    signupData.password=await hashedPassword(data.password);
    await signupData.save();

    const token=generateToken(data);
    res.status(200).json("user addes succesfully",token);
}


module.exports={adminSignup};