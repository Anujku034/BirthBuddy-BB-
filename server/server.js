const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoutes = require('./routes/auth/authRoutes.js');
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
const port = process.env.PORT;
connectDB(); 
app.use("/api/auth",authRoutes);
app.get("/",(req,res) =>{
    res.send('hello world')
});
app.listen(port,() => {
    console.log(`Example app listening on port ${port}`);
   
})