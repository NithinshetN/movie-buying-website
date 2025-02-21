const RazorPay=require("razorpay");
const {v4}=require("uuid");
const config=require("../config/config");
const { decodeToken } = require("../utils/jsonWebToken");

const razorPay=new RazorPay({
    key_id:config.razorpay.key_id,
    key_secret:config.razorpay.key_secret
})

const createOrder=async (req,res,next)=>{
    const token=req.headers.authorization;
    const userCred=decodeToken(token);
    const options={
        amount: req.body.amount * 100,
        currency:"INR",
        receipt: v4(), //generation uniquie reciept id for each order
    }

    try{
        const order=await razorPay.orders.create(options);
        order.razorPayKey=config.razorpay.key_id;
        order.username=userCred.username;
        order.email=userCred.email;
        res.status(200).json(order);
    }catch(error){
        return next(error);
    }

}

module.exports={createOrder};