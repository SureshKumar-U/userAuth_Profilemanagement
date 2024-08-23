

const getUserByEmail = async(req,email)=>{
    const query = "select id, name,email,password,role from users where email = ?"
    const [result] = await req.app.get("db").query(query,[email])
    return result

}

const createUser = async(req,user)=>{
    const query = "INSERT INTO users (name,email,password,role) values (?,?,?,?)"
     await req.app.get('db').query(query,[user.name,user.email,user.password,user.role])
}

const updateUser = async(req,user)=>{
    const{name,role,userId} = user
    console.log(user)
    const query = "UPDATE  users set name = ?, role = ? where id = ?"
   const result = await req.app.get("db").query(query,[name,role,userId])
   console.log(result)
}

module.exports = {getUserByEmail,createUser,updateUser}