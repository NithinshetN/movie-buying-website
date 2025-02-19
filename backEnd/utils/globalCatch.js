
const globalCatch=(error,req,res,next)=>{
    console.dir(error);
    res.status(404).json({error});
};

module.exports=globalCatch;
