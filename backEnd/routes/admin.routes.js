const express=require("express");
const { adminSignup, adminSignin } = require("../controllers/admin.controller");
const { addMovie } = require("../controllers/movie.controller");
const { adminAuth } = require("../middleware/admin.middleware");
const router = express.Router();

router.post("/signup",adminSignup);
router.post("/signin",adminSignin)
router.post("/addMovie",adminAuth,addMovie);

module.exports=router;