const z=require("zod");

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

module.exports={validateMovie};