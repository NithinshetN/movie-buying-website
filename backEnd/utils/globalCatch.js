export const globalCatch=(req,res,next,error)=>{
    res.status(404).json({error});
    console.log(error);
}
