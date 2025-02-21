const User=require("../models/user.models");
const {userSchema,userEmailSchema}=require("../validations/user.validation");
const {hashedPassword,comparePassword}=require("../utils/passwordHash");
const {generateToken}=require("../utils/jsonWebToken");
const { userExists ,updatePaymentId,updateMoviesPurchased,updateMoviesRented,ifMovieAquired} = require("../services/user.services");

const userSignup=async (req,res,next)=>{
    try{
        const jsonData=req.body
        const validation=userSchema.safeParse(jsonData);
        if(!validation.success){
            return next(validation.error.errors[0].message);
        }

        if(await userExists({"username":jsonData.username,"email":jsonData.email})){
            return next("User Exists");
        }

        const userData=new User(jsonData);
        userData.password=await hashedPassword(jsonData.password);
        await userData.save();

        const token=generateToken({username:jsonData.username,email:jsonData.email});
        res.status(200).json({token:token,msg:"user created succesfully"});
    }
    catch(error){
        return next(error);
    }
}

const userSignin=async(req,res,next)=>{
    try{
        const jsonData=req.body;
        const validation=userEmailSchema.safeParse({email:jsonData.email});
        
        if(!validation.success){
            return next(validation.error.errors[0].message);
        }

        if(!await userExists({email:jsonData.email})){
            return next("This email is not registered with us. Please sign up.");
        }

        const userData=await User.findOne({email:jsonData.email});
        if(!await comparePassword(jsonData.password,userData.password)){
            return next("wrong password");
        }

        const token=generateToken({username:userData.username,email:userData.email});
        res.status(200).json({token})

    }catch(error){
        return next(error);
    }
}

const verifyToken=(req,res,next)=>{
    try{
        res.status(200).json({validation:true,username:req.username,email:req.email})
    }catch(error){
        return next(error);
    }
}

const addpaymentId=async (req,res,next)=>{
    try{
        if(await updatePaymentId({email:req.email,paymentId:req.body.paymentId})){
            res.status(200).json("movie id added succesfully");
        }else{
            return next("error");
        }
    }catch(error){
        return next(error);
    }
}

const addToRentedMovies=async (req,res,next)=>{
    try{
        if(await updateMoviesRented({email:req.email,movieId:req.body.movieId})){
            res.status(200).json("movie id added succesfully");
        }else{
            return next("error");
        }
    }catch(error){
        return next(error);
    }
}

const addToPurchasedMovies=async (req,res,next)=>{
    try{
        if(await updateMoviesPurchased({email:req.email,movieId:req.body.movieId})){
            res.status(200).json("movie id added succesfully");
        }else{
            return next("error");
        }
    }catch(error){
        return next(error);
    }
}

const movieAquired=async (req,res,next)=>{
    try{
        if(await ifMovieAquired({email:req.email,movieId:req.params.movieId})){
            return res.status(200).json({validation:true,message:"You have access to this movie"})
        };

        res.status(200).json({validation:false,message:""});

    }catch(error){
        return next(error);
    }
}

module.exports={userSignup,userSignin,addpaymentId,verifyToken,addToPurchasedMovies,addToRentedMovies,movieAquired};