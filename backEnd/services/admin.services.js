const Admin=require("../models/admin.models");

//verifys if the admin is present
//takes email and username for verifcaton
const adminExists=async(data)=>{
    const validation=await Admin.FindOne({
        "$or":[
            {username:data.username},
            {email:data.email}
        ]
    })
    return validation!==null;
}

module.exports={adminExists}
