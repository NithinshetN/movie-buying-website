
require("dotenv").config();

const config={
    app:{
        port:process.env.PORT || 3000,
        env: process.env.NODE_ENV || "development"
    },
    database:{
        uri:`mongodb+srv://nithinshetn:${process.env.dbpass}@moviedatabase.meodt.mongodb.net/${process.env.dbname}`
    },
    jwt:{
        secret:process.env.JWT_SECRET
    },
    razorpay:{
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_KEY_SECRET
    }
}

module.exports=config;