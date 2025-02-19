const express=require("express");
const adminRouter=require("./routes/admin.routes");
const bodyParser=require("body-parser");
const { config } = require("./config/config");
const app=express();


app.use(bodyParser.json());
app.use("/admin", adminRouter);

app.listen(config.app.port,()=>{
    console.log("server is running");
});



