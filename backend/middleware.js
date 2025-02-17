import { decode } from "jsonwebtoken";
import jwt from "jsonwebtoken"

import { JWT_SECRET } from "./config";


export const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('bearer')){
        return  res.status(403).json({})
    }

    const token = authHeader.split('')[1]
    
    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        req.userId = decoded.userId
        next();
    }
    catch(e){
        return res.status(403).json({})
    }

}


