import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing user order form frontend
const placeOrder = async (req, res) => {


    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Calculate the total cost of all items including quantities
        const totalCost = req.body.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        // Calculate delivery charge as 5% of the total cost
        const deliveryCharge = totalCost * 0.05;

        // Construct line items including the delivery charge
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 // Unit amount is the price per item in smallest currency unit
                // Note: Multiplying by 100 if the currency unit is paisa (e.g., for INR)
            },
            quantity: item.quantity
        }));

        // Add delivery charge item to line_items array
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: Math.round(deliveryCharge * 100) // Convert delivery charge to smallest currency unit
            },
            quantity: 1 // Quantity of delivery charge item is 1
        });

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Platform Charges"
                },
                unit_amount: 5 * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in placing order" })
    }
}

const verifyOrder = async (req,res) =>{

    const {orderId,success} = req.body;
    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in payment"});
    }
}

// user orders for frontend

const userOrders = async(req,res) =>{

    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders});
    } catch (error) {
        console.error();
        res.json({success:false,message:"Failed to get user Order details"});
    }
}


// listing orders for admin panel
const listOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Unable to list orders"})
    }
}

// api for updating order status
const updateState = async(req,res)=>{

    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error Status not Updated"})
    }
}



export { placeOrder,verifyOrder,userOrders,listOrders,updateState };