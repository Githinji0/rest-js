import jwt from "jsonwebtoken";
import { prisma } from "../config/database.js";
import { generateToken } from './../utils/generateToken';
import e from "express";




const authMiddleware = async (req, res, next) => {
   try {
     console.log("AuthMiddleware running....");

     let token;
     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];



     }else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
     }

     if(!token){
        return res.status(401).json({ error: "Unauthorized: No token provided" });
     }

     const decoded = jwt.verify(token, process.env.JWT_SECRET);

     const user = await prisma.user.findUnique({
        where: { id: decoded.id },
     })

     if (!user) {
        return res.status(401).json({ error: "Unauthorized: User not found" });
     }

     req.user = user;
     next();    
   } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(401).json({ error: "Unauthorized" });
    process.exit(1);
   }
}

export default authMiddleware