const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {getUserByEmail,createUser} = require("../models/userModels")
const secret = process.env.SECRET
const registerUser = async(req,res)=>{
    try{
        const {name,email,password,role } = req.body
        if(!name || !email || !password || !role ) {
            return res.status(400).json({status:400, message:"All fields are required"})
        }
        const result = await getUserByEmail(req,email)

           if(result.length !== 0){
            return res.status(400).json({status:400, message:"User already existed with these email"})
        }

        const hashedPassword = await bcrypt.hashSync(password, 10)
        const user = {
            name: name,
            email: email, 
            password:hashedPassword,
            role:role
        }
         await createUser(req,user)
        return res.status(200).json({status:200,message:"user registered successfully"})
    }catch(err){
        console.log(err)
        return res.status(500).json({
            status:500,
            message:"Internal or External server error"
        })
    }
} 

const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({status:400,message:"All fields are mandatory"})
        }
        const result= await getUserByEmail(req,email)

        if(result.length == 0){
            return res.status(400).json({status:401, message:"Invalid email"})
        }
        
        const hashedpassword = result[0].password
        const ispasswordMatch = bcrypt.compareSync(password,hashedpassword)
        if(!ispasswordMatch){
            return res.status(400).json({status:400,message :"Invalid password"})
        }
        //create a token
        const token = await jwt.sign({email},secret,{ expiresIn: '1h' })
        return res.status(200).json({status:200,message:"User login successfully",token : token})

    }catch(error){
        console.log(error)
        return res.status(500).json({status:500, message:error.error })
    }
}


module.exports = {loginUser,registerUser}