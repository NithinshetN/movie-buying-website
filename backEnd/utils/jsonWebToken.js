const jwt=require("jsonwebtoken");
const config=require("../config/config")
const generateToken=(data)=>{
    return jwt.sign(data,config.jwt.secret);
}

const verifyToken=(token)=>{
    return jwt.verify(token,config.jwt.secret);
}

const decodeToken=(token)=>{
    return jwt.decode(token,config.jwt.secret);
}

module.exports={generateToken,verifyToken,decodeToken};