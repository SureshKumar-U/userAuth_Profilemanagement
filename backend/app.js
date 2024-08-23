const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT || 8080
const db= require("./config/db.js")
const authRoutes = require("./routes/authRoutes.js")
const profileRoutes = require("./routes/profileRoutes.js")
const {authMiddleware} = require("./middlewares/authMiddleware.js")
const morgan = require("morgan")
const cors = require("cors")
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}


app.use(cors(corsOptions));
app.use(morgan(':method :url :status :response-time ms'));
app.set("db", db)  // add db property to app
app.use(express.json())  // pares the incoming
 
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/profile",authMiddleware, profileRoutes)

app.all("*",(req,res)=>{    //handling invalid endpoint
    return res.status(404).json({ 
        statu:404,
        error:"Invalid endpoint"
    })
})

app.listen(port,()=>console.log(`server started at ${port}`))