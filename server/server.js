const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const User = require("./models/User.js");
const authRoutes = require('./routes/auth/authRoutes.js');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;
connectDB(); 
app.use("/api/auth",authRoutes);
app.get("/",(req,res) =>{
    res.send('hello world')
});
app.post("/test-user", async(req,res) => {
    try{
        const user =  await User.create(req.body);
        res.status(201).json({
            message: "User created successfully",
            user,

        });
    }
    catch(error) {
        res.status(400).json({
            message:"Validation failed",
            error: error.message,
        });
    }
});
app.listen(port,() => {
    console.log(`Example app listening on port ${port}`);
   
})