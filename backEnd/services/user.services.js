const User = require("../models/user.models");

const userExists = async (data) => {
    const ifExists = await User.findOne({
        "$or": [
            { username: data.username },
            { email: data.email }
        ]
    });
    return ifExists !== null;
};

const updatePaymentId = async (data) => {
    const email = data.email;
    try {
        const userData = await User.updateOne({ email }, {
            "$push": {
                paymentId: data.paymentId
            }
        });
        return userData.acknowledged;
    } catch (error) {
        return next(error);
    }
}

const updateMoviesRented = async (data) => {
    const email = data.email;
    try {

        const userData = await User.updateOne({ email }, {
            "$push": {
                moviesRented: data.movieId
            }
        });
        return userData.acknowledged;
    } catch (error) {
        return next(error);
    }
}

const updateMoviesPurchased = async (data) => {
    const email = data.email;
    try {
        const userData = await User.updateOne({ email }, {
            "$push": {
                moviesPurchased: data.movieId
            }
        });
        return userData.acknowledged;
    } catch (error) {
        return next(error);
    }
}

const ifMovieAquired = async (data) => {
    const movieId = data.movieId;
    const userData = await User.findOne({ email: data.email });

    if (!userData) {
        throw new Error("user not found")
    }

    if (userData.moviesPurchased.includes(movieId) || userData.moviesRented.includes(movieId)) {
        return true;
    }

    return false;

}
module.exports = { userExists, updatePaymentId, updateMoviesPurchased, updateMoviesRented, ifMovieAquired };