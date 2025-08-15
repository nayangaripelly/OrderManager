import express from "express";
import { userAuth } from "./middlewares/userAuth.js";
import { orderModel } from "./db.js";
import zod from "zod";
import {Request} from "express";

interface customReq extends Request {
    id?: String
}

const orderRouter = express.Router();

const orderSchema = zod.object({
    name: zod.string(),
    description: zod.string().optional(),
    company: zod.string().optional(),
    quantity: zod.number().default(1),
    catagory: zod.enum(["electronic", "cosmetic","clothing","other" ]),
    status: zod.enum(["pending","shipped","delivered","cancelled" ]),
    cost: zod.number(),
    discount: zod.number().default(0)
});

orderRouter.post("/", userAuth, async (req:customReq, res) => {
    const { body } = req;
    const orderCheck = orderSchema.safeParse(body);
    if(!orderCheck.success)
    {
        res.status(400).json({message: "invalid data"});
        return;
    }
    try{
        const order = await orderModel.create({...body, userId: req.id});
        res.status(200).json({message: "order created successfully", order});
        return;
    }
    catch(e)
    {
        res.status(500).json({message: "Internal server error" });
        return;
    }
});

orderRouter.get("/", userAuth, async (req:customReq, res) => {
    try{
        const orders = await orderModel.find({userId: req.id});
        res.status(200).json({orders});
        return;
    }
    catch(e)
    {
        res.status(500).json({message: "Internal server error"});
        return;
    }
});

orderRouter.put("/:orderId", userAuth, async (req:customReq, res) => {
    const { orderId } = req.params;
    const { body } = req;
    const orderCheck = orderSchema.safeParse(body);
    if(!orderCheck.success)
    {
        res.status(400).json({message: "invalid data"});
        return;
    }
    try{
        const order = await orderModel.findOneAndUpdate({_id: orderId, userId: req.id}, body, {new: true});
        if(!order)
        {
            res.status(404).json({message: "order not found"});
            return;
        }
        res.status(200).json({message: "order updated successfully", order});
        return;
    }
    catch(e)
    {
        res.status(500).json({message: "Internal server error"});
        return;
    }
});

orderRouter.delete("/:orderId", userAuth, async (req:customReq, res) => {
    const { orderId } = req.params;
    try{
        const order = await orderModel.findOneAndDelete({_id: orderId, userId: req.id});
        if(!order)
        {
            res.status(404).json({message: "order not found"});
            return;
        }
        res.status(200).json({message: "order deleted successfully"});
        return;
    }
    catch(e)
    {
        res.status(500).json({message: "Internal server error"});
        return;
    }
});

export default orderRouter;