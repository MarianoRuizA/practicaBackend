import jwt from "jsonwebtoken"

const comprobacionJwt = (req,res,next)=>{
    const token =  req.headers.authorization;
    if(!token){
        return res.status(401).json({message: "No es admin"})
    }
    try {
        const verifyToken =  jwt.verify(token, process.env.SECRET_KEY)
        req.user = verifyToken;
        next();
    } catch (error) {
        console.log()
    }
}

 export default comprobacionJwt;