const Movie = require("../models/movie.models");
const { movieExists } = require("../services/movie.services");
const { validateMovie } = require("../validations/movie.validation");

//controllers used to add Movie to the dataBase
const addMovie = async (req, res, next) => {
    movieData=req.body;
    const validationMovie = validateMovie(req.body);
    if (!validationMovie.success) {
        return next("wrong format");
    }
    if (await movieExists({title:movieData.title})) {
        return next(`${req.body.title}:Movie exists`)
    }
    try {
        const newMovie = new Movie(movieData);
        const savedMovie = await newMovie.save();
        res.status(200).json({ message: "movie added succesfully", movie: savedMovie });
    } catch (error) {
        next(error);
    }
};

//this controller returns data based on the parameters give will send all if no parameters are specified
const getMovie = async (req, res, next) => {
    try {
        const value = req.params.value;
        let movies;
        if (!value) {
            movies = await Movie.find();
        } else {
            const regex = new RegExp(value, 'i');
            movies = await Movie.find({ title: {$regex:regex} });
        }
        res.status(200).json(movies);
    } catch (error) {
        return next(error);
    }

}

module.exports={addMovie,getMovie}