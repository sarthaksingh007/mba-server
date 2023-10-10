import {asyncError} from '../middleware/errorMiddleware.js'
import {User} from "../models/User.js"
import {Order} from "../models/Order.js"

export const MyProfile=(req,res,next)=>{
    res.status(200).json({
        success:true,
        user:req.user,
    })
}

export const logout=(req,res,next)=>{
    req.session.destroy((err)=>{
        if(err) return next(err);

        res.clearCookie("connect.sid");
        res.status(200).json({
            message: "Logged out",
        });
    });
};


export const GetAdminUsers=asyncError(async(req,res,next)=>{

    const users=await User.find({});
    res.status(200).json({
        success:true,
        users,
    });
});

export const GetAdminStats  =asyncError(async(req,res,next)=>{

    const userCount=await User.countDocuments();

    const orders=await Order.find({});

    const preparingOrders=orders.filter((i)=> i.orderStatus === "Preparing");
    const shippedOrders=orders.filter((i)=> i.orderStatus === "Shipped");
    const deliveredOrders=orders.filter((i)=> i.orderStatus === "Delivered");

    let totalIncome=0;

    orders.forEach((i)=>{
        totalIncome+=i.totalAmount;
    })

    res.status(200).json({
        success:true,
        userCount,
        totalIncome,
        ordersCount:{
            total:orders.length,
            preparing:preparingOrders.length,
            shipped:shippedOrders.length,
            delivered:deliveredOrders.length
        },
    });
});