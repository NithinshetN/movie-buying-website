const mongoose=require("mongoose");
const config=require("./config.js");

const connectToDatabase=async ()=>{
    try{
        console.log(config.database.uri)
        await mongoose.connect(config.database.uri);
        console.log("connected to the database");
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