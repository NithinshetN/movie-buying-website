const bcrypt=require("bcryptjs");

const hashedPassword=async(password)=>{
    const salt=await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

const comparePassword=async(password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword);
}

module.exports={hashedPassword,comparePassword};