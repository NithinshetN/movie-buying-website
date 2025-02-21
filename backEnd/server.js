const express=require("express");
const adminRouter=require("./routes/admin.routes");
const movieRouter=require("./routes/movie.routes");
const userRouter=require("./routes/user.routes")
const bodyParser=require("body-parser");
const config= require("./config/config");
const app=express();
const globalCatch=require("./utils/globalCatch")
const db=require("./db")
const cors=require("cors");

app.use(bodyParser.json());
app.use(cors());
app.use("/admin", adminRouter);
app.use("/movie",movieRouter);
app.use("/user",userRouter);

app.use(globalCatch);

app.listen(config.app.port,()=>{
    console.log("server is running");
});



