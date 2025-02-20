const express=require("express");
const {userSignin,userSignup}=require("../controllers/user.controller");
const router=express.Router();

router.post("/signin",userSignin);
router.post("/signup",userSignup);

module.exports=router;