const z=require("zod");
const movie=require("../models/movie.model")
const movieSchema=z.object({
    thumbnail: z.string(),
    trailer: z.string(),
    title: z.string(),
    description: z.string(),
    price: z.array(z.string()),
    currency: z.string(),
    duration: z.string()
});

const validateMovie=(data)=>{
    const result=movieSchema.safeParse(data)
    return result;
}

const movieExists= async(title)=>{
    const existingMovie=await movie.findOne({title:title});
    return existingMovie!==null;
}

module.exports={validateMovie,movieExists};