const express=require("express");
const {userSignin,userSignup, addpaymentId,verifyToken,addToPurchasedMovies,addToRentedMovies, movieAquired}=require("../controllers/user.controller");
const { createOrder } = require("../controllers/payment.controller");
const { userAuth } = require("../middleware/user.middleware");
const router=express.Router();

router.post("/signin",userSignin);
router.post("/signup",userSignup);
router.post("/orders",createOrder);
router.get("/verify-token",userAuth,verifyToken);
router.put("/movies/payment-id",userAuth,addpaymentId);
router.put("/movies/rented",userAuth,addToRentedMovies);
router.put("/movies/purchased",userAuth,addToPurchasedMovies);
router.get("/movies/exists/:movieId",userAuth,movieAquired);

module.exports=router;