const dotenv = require("dotenv");
const express = require('express');
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require('./routes/auth/authRoutes.js');
const personRoutes = require("./routes/person/personRoutes");
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use("/uploads",express.static("uploads"));
const port = process.env.PORT;
connectDB(); 

// Routes

app.use("/api/auth",authRoutes);
app.use("/api",personRoutes);













app.listen(port,() => {
    console.log(`Example app listening on port ${port}`);
   
})