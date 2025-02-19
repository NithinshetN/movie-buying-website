const mongoose=require("../db");

const MovieSchema=mongoose.Schema({
    thumbnail:{
        type:String,
        required:true
    },
    trailer:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:[Number],
        required:true
    },
    currency:{
        type:String
        ,required:true
    },
    duration:{
        type:String,
        required:true
    }
})

const Movie=mongoose.model("Movies",MovieSchema);

module.exports=Movie;