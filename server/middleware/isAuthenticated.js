import jwt, { decode } from "jsonwebtoken";

const isAuthenticated = async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({message: "Invalid Token"});
        }
        req.id = decoded.userId;
        next();
    } catch (err) {
        console.log("Error: ", err);
    }
}

export default isAuthenticated;