const express = require("express");
const z = require("zod")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const RazorPay = require('razorpay');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidV4 } = require("uuid");
require("dotenv").config();

const jwtPass = process.env.JWT_SECRET;
const dbpass = process.env.dbpass;
dbname = "movie";

//function to connet to the database
const connectToDatabase = async () => {
    try {
        mongoose.connect(`mongodb+srv://nithinshetn:${dbpass}@moviedatabase.meodt.mongodb.net/${dbname}`)
            .then(ele => {
                console.log("Connected to  database");
            });

        const movieSchema = mongoose.Schema({
            thumbnail: String,
            trailer: String,
            title: String,
            description: String,
            price: Array,
            currency: String,
            duration: String,
        });

        const userSchema = mongoose.Schema({
            username: { type: String, required: true, unique: true },
            admin: { type: Boolean, default: false },
            email: { type: String, required: true, unique: true },
            password: { type: String ,required:true},
            ordersBought: [String],
            ordersRented: [String],
        })

        //middleware to hash password before saving in the database.
        userSchema.pre('save', async function (next) {
            if (!this.isModified("password")) return next();
            try {
                const salt = await bcrypt.genSalt(10);
                this.password = await bcrypt.hash(this.password, salt);
                next();
            } catch (error) {
                next(error);
            }
        });

        const movie = mongoose.model("Movie", movieSchema);
        const user = mongoose.model("User", userSchema)

        return { movie, user }

    } catch (error) {
        next(error);
    }
}


let movie, user;
(async () => {
    ({ movie, user } = await connectToDatabase());
})();

//function to validate the data for user and movie
const validateFormatMovie = obj => {
    
    const schema = z.object({
        thumbnail: z.string(),
        trailer: z.string(),
        title: z.string(),
        description: z.string(),
        price: z.array(z.string()),
        currency: z.string(),
        duration: z.string()
    });

    return schema.safeParse(obj).success;
}

const validateFormatUser = obj => {
    const schema = z.object({
        username: z.string().min(5, { message: "username must be 5 charecters long" }),
        admin: z.boolean(),
        email: z.string().email({ message: "Enter valid email" }),
        password: z.string()
            .min(8, { message: "password must be at least 8 characters long " })
            .regex(/[A-Z]/, { message: "Password must contain at least one capital letter" })
            .regex(/[0-9]/, { message: 'Password must contain at least one numerical character' })
            .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, { message: 'Password must contain at least one symbol' }),
        ordersBought: z.array(z.string()),
        ordersRented: z.array(z.string())
    })
    return schema.safeParse(obj);
}


const movieExists = async (title) => {
    const existingMovie = await movie.findOne({ title: title });
    return existingMovie !== null;
}

const userExists = async (email, userName) => {
    const existingUser = await user.findOne({ $or: [{ email: email }, { username: userName }] });
    return existingUser !== null;
}

app.use(express.json());
app.use(cors());

app.post("/addmovies", async (req, res,next) => {
    if (validateFormatMovie(req.body)) {
        if (!await movieExists(req.body.title)) {
            const addMovie = new movie(req.body);
            addMovie.save().then(ele => {
                console.log("Movie details saved succesfully", ele);
                res.status(200).json({ message: "The movie was added succesfully", movie: ele })
            }).catch(err => {
                next(err);
            })
        } else {
            next("Movie Exists");
        }
    } else {
        next("invalid format");
    }
});

app.get("/movies/:value?", async (req, res,next) => { // '?' makes 'value' optional
    let movies;
    try {
        const value = req.params.value;
        if (!value) { // Check if value is falsy (null, undefined, or empty string)
            movies = await movie.find(); // Fetch all movies
        } else {
            const regex = new RegExp(value, 'i'); // Create a case-insensitive regex
            movies = await movie.find({ title: { $regex: regex } }); // Fetch movies matching the title
        }
        res.status(200).json(movies); // Return the fetched movies
    } catch (error) {
        next(error);
    }
});


app.use(bodyParser.json());

const razorPay = new RazorPay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret
})

app.post("/createOrder", async (req, res, next) => {
    const amount = req.body.amount;
    const options = {
        amount: amount, // amount in the smallest currency unit (paise)
        currency: "INR",
        receipt: uuidV4() // You can generate a unique receipt ID for each order
    };
    console.log(uuidV4());
    try {
        const order = await razorPay.orders.create(options);
        order.razorPayKey = process.env.key_id;
        res.status(200).json(order)
    } catch (error) {
        next(error);
    }
})



//Route to singup
const signup = async (req, res, next) => {
    const signupData = req.body;
    if (!validateFormatUser(signupData).success) {
        return next(validateFormatUser(signupData).error.errors[0].message);
    }

    if (await userExists(signupData.email, signupData.username)) {
        return next("user Exists");
    }

    const userData = new user(signupData);
    userData.save().then(ele => {
        next();
    }).catch(error => { next(error) })
}


//middleware for signin
const signin = async (req, res, next) => {
    const signinCred = req.body;
    console.log(signinCred);
    if (!await userExists(signinCred.email)) {
        return next("Invalid user");
    }

    const userData = await user.findOne({ email: signinCred.email });
    console.log(userData);
    if (!await bcrypt.compare(signinCred.password, userData.password)) {
        return next("Invalid password")
    }

    req.body.username = userData.username;
    req.body.admin = userData.admin;
    next();

}

//middleware for creating jwt token
const createJWTToken = (req, res, next) => {
    const userData = req.body;
    const token = jwt.sign({ username: userData.username, email: userData.email, admin: userData.admin }, jwtPass);
    res.status(200).json({ token, email: (userData.username) });
}

//route for signup
app.post("/signup/", signup, createJWTToken, (req, res) => {
})

//route for signin
app.post("/login", signin, createJWTToken, (req, res) => {
})


const verifyJWTToken = (req, res, next) => {
    const authorizaiton = req.headers.authorizaiton;
    if (jwt.verify(authorizaiton, jwtPass)) {
        next();
    } else {
        res.status(401).json("invalid json token")
    }
}

//global error
app.use((error, req, res, next) => {
    console.log(error)
    res.status(400).json( {error} );
});



app.listen(3000);