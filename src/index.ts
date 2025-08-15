import express from "express";
import mongoose from "mongoose";
import {userModel} from "./db.js";
import zod from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import orderRoutes from "./orderRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const mongourl = process.env.MONGO_URL as string;
const jwtsecret = process.env.JWT_SECRET as string;

app.use(express.json());


const userSchema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6)
});

app.post("/api/v1/signup",async function(req,res)
{
    const {username, email, password} = req.body;
    const userCheck = userSchema.safeParse({username, email, password});
    if(!userCheck.success)
    {
        res.status(400).json({message: "invalid input"});
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try{
        const user = await userModel.create({username, email, password: hashedPassword});
        res.status(200).json({
            msg : "signup successfully"
        });
        return;
    }
    catch(e)
    {
        res.status(500).json({message: "Internal server error"});
        return;
    }
});

app.post("/api/v1/signin",async function(req, res)
{
    const {email, password} = req.body;
    const userCheck = userSchema.safeParse({username:"random", email, password});
    if(!userCheck.success)
    {
        res.status(400).json({message: "invalid data"});
        return;
    }
    try{
        const user = await userModel.findOne({email});
        if(!user)
        {
            res.status(400).json({message: "user not found" });
            return;
        }
        const passwordCheck = await bcrypt.compare(password, user?.password as string);
        if(!passwordCheck)
        {
            res.status(400).json({message: "incorrect password"});
            return;
        }
        const token = jwt.sign({id: user._id}, jwtsecret);
        res.status(200).json({token});
    }
    catch(e)
    {
        res.status(500).json({message: "Internal server error"});
    }
});

app.use("/api/v1/orders",orderRoutes); // order related routes

async function main()
{
    await mongoose.connect(mongourl);
    app.listen(3000);
}

main();
