const express = require("express");
const z = require("zod")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const RazorPay = require('razorpay');
const bodyParser = require('body-parser');
require("dotenv").config();

const dbpass=process.env.dbpass;
dbname = "movie";
mongoose.connect(`mongodb+srv://nithinshetn:${dbpass}@moviedatabase.meodt.mongodb.net/${dbname}`)
    .then(ele => {
        console.log("connected to database");
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

const validateFormat= obj =>{
    const schema=z.object({
        thumbnail:z.string(),
        trailer: z.string(),
        title: z.string(),
        description: z.string(),
        price: z.array(z.string()),
        currency:z.string(),
        duration: z.string()
    })
    return schema.safeParse(obj).success;
 }


const movie = mongoose.model("Movie", movieSchema);

const movieExists=async (title)=>{
    const existingMovie=await movie.findOne({$or:[{title}]});
    return existingMovie !==null;
}

app.use(express.json());
app.use(cors());

app.post("/addmovies",async (req,res,next)=>{
    if(validateFormat(req.body)){
        if (!await movieExists(req.body.title)){
            const addMovie= new movie(req.body);
            addMovie.save().then(ele=>{
                console.log("Movie details saved succesfully",ele);
                res.status(200).json({message:"The movie was added succesfully", movie:ele})
            }).catch(err=>{
                console.log("some error",err);
                res.status(400).json({error: "There was some error", error:err})
            })
        }else{
            console.log("Existing movie");
            res.status(400).json({error:"Existing movie"});
        }
    }else{
        console.log("invalid format")
        res.status(400).json({error:"invalid format"})
    }
});

app.get("/getmovies/:value?", async (req, res) => { // '?' makes 'value' optional
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
        console.log(error);
        res.status(400).json({ error: error.message }); // Return the error message
    }
});


app.use(bodyParser.json());

const razorPay=new RazorPay({
    key_id:process.env.key_id,
    key_secret:process.env.key_secret
})

app.post("/createOrder", async(req,res)=>{
    const amount=req.body.amount;
    const options = {
        amount: amount, // amount in the smallest currency unit (paise)
        currency: "INR",
        receipt: "order_rcptid_01" // You can generate a unique receipt ID for each order
      };

      try{
        const order =await razorPay .orders.create(options);
        order.razorPayKey=process.env.key_id;
        console.log(order);
        res.status(200).json(order)
      }catch(error){
        console.log(error);
        res.status(400).json(error);
      }
})


app.listen(3000);