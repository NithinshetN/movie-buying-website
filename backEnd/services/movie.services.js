const Movie=require("../models/movie.models");

const movieExists=async(data)=>{
    const exists= await Movie.findOne(data);
    return exists!==null;
}

module.exports={movieExists};