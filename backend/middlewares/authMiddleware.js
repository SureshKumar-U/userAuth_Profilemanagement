const jwt = require("jsonwebtoken")
const secret = process.env.SECRET

const authMiddleware = async(req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        const token = req.headers.authorization.split("Bearer ")[1].trim()
        console.log(token)
        try{
            const decoded = jwt.verify(token,"suresh")
            req.userEmail = decoded.email
            next()
        }
        catch(err){
            return res.json({
                status:"400",
                message: err.message
            })
        }

     
 
    
    }
    else{
       return res.status(400).json({
            status:"Failed",
            error:"token was Not Found"
        })
    }
    
}

module.exports = {authMiddleware}

