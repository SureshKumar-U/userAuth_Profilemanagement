const { getUserByEmail,updateUser } = require("../models/userModels")

const getUserprofile = async(req,res)=>{
    try{
        const {userEmail} =  req
        const [exitedUser] = await getUserByEmail(req,userEmail)
        if(!exitedUser){
            return res.status(400).json({status:"400", message:"Unauthorized user"})
        }
        res.status(200).json({
            status:"200",
            message: "User profile fetched successfully",
            result : {
                user_id :exitedUser.id,
                user_name :exitedUser.name,
                user_email:exitedUser.email,
                user_role: exitedUser.role
             }
        })
    }catch(err){
        return res.status(500).json({
            status:500,
            error: err
        })
    }
}



const updateUserProfile = async(req,res)=>{
    try{
        const userId = req.params.id
        const { userEmail } = req
        const { name, role} = req.body
        if(!name || !role){
            return res.status(400).json({status:400, message:"Name and Role are required"})
        }
  
        if (!userId){
            return res.status(400).json({ status:400, message:"User Id is required"})
        }
        const [existingUser] = await getUserByEmail(req,userEmail)
        console.log(existingUser)

        if(!existingUser){
            return res.status(404).json({ status: 404, message: "User not found" });
        }
        if(existingUser.id != userId){
            return res.json({status:400, message:"unauthorized user"})
        }
        await updateUser(req,{name,role,userId})
        return res.status(200).json({status:200, message:"userprofile updated successfully"})

    }catch(err){
        console.log(err)
        return res.status(500).status({
            status:500,
            error:err
        })
    }
}
module.exports = {getUserprofile,updateUserProfile}