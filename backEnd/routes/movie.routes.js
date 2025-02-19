const express=require("express");
const {getMovie}=require("../controllers/movie.controller");

const router=express.Router();

router.get("/movies/:value?",getMovie);

module.exports=router;