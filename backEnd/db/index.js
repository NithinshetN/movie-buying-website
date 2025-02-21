const mongoose=require("mongoose");
const config=require("../config/config");
const connectToDatabase=async ()=>{
    try{
        await mongoose.connect(config.database.uri);
    }catch(error){
        console.error("Database connection error",error);
        process.exit(1);
    }
}

mongoose.connection.on("connected",()=>{
    console.log("Mongoose connected to database");
});

mongoose.connection.on("error",(err)=>{
    console.log("Mongoose connection error:",err);
});

mongoose.connection.on("disconnected",()=>{
    console.log("Mongoose disconnected from database");
})

connectToDatabase();
module.exports=connectToDatabase;