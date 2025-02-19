const z=require("zod");
const Admin = require("../models/admin.models");

const adminSchema=z.object({
    username: z.string().min(5, { message: "username must be 5 charecters long" }),
    email: z.string().email({ message: "Enter valid email" }),
    password: z.string()
        .min(8, { message: "password must be at least 8 characters long " })
        .regex(/[A-Z]/, { message: "Password must contain at least one capital letter" })
        .regex(/[0-9]/, { message: 'Password must contain at least one numerical character' })
        .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, { message: 'Password must contain at least one symbol' }),
});

const validateAdmin=(data)=>{
    const result=userSchema.safeParse(data);
    return result;
}

module.exports={validateAdmin};