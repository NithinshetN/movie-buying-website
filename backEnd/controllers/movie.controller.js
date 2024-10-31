const movie = require("../models/movie.model");
const { validateMovie, movieExists } = require("../validations/movie.validation");


exports.addMovie = async (req, res, next) => {
    const validationMovie = validateMovie(req.body);
    if (!validationMovie.success) {
        return next("wrong format");
    }
    if (movieExists(req.body.title)) {
        return next(`${req.body.title}:Movie exists`)
    }
    try {
        const newMovie = new movie(req.body);
        const savedMovie = await newMovie.save();
        res.status(200).json({ message: "movie added succesfully", movie: savedMovie });
    } catch (error) {
        next(error);
    }
};

//this controller returns data based on the parameters give will send all if no parameters are specified
exports.getMovie = async (req, res, next) => {
    try {
        const value = req.params.value;
        let data;
        if (title) {
            const regex = new RegExp(value, i)
            data = await movie.find({ title: {$regex:regex} });
        } else {
            data = await movie.find();
        }
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }

}