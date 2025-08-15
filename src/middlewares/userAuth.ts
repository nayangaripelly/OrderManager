import jwt, { JwtPayload } from "jsonwebtoken";
import { Request ,Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
const jwtsecret = process.env.JWT_SECRET as string;

interface customReq extends Request {
    id? : string
}

export function userAuth(req:customReq, res:Response, next:NextFunction)
{
    const token = req.headers.authorization;
    if(!token)
    {
        res.status(401).json({message: "unauthorized"});
        return;
    }
    try{
        const decoded = jwt.verify(token, jwtsecret) as JwtPayload;
        req.id = decoded.id;
        next();
    }
    catch(e)
    {
        res.status(401).json({message: "unauthorized"});
    }
}