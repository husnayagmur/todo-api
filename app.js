const express=require("express");
const app =express();
require("dotenv").config();
require("./src/config/databaseConnection")
const port=process.env.PORT || 5001;
const todoRouter=require("./src/routes/todoRoutes")
const userRouter = require("./src/routes/userRoutes");
app.use(express.json()); 

app.use("/api",todoRouter)
app.use("/api/users", userRouter);
app.get("/",(req,res)=>{
    res.send("Hoş Geldiniz")
})

app.listen(port,()=>{
    console.log(`server ${port} portunda çalışıyor`)
})
