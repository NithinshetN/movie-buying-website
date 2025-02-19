const jwt=require("jsonwebtoken");
const config=require("../config/config")
const generateToken=(data)=>{
    return jwt.sign(data,config.secret);
}

const verifyToken=(token)=>{
    return jwt.verify(token,config.secret);
}

const decodeToken=(token)=>{
    return jwt.decode(token,config.secret);
}

module.exports={generateToken,verifyToken,decodeToken};