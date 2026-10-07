const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth/authRoutes.js");
const personRoutes = require("./routes/person/personRoutes");
const messageRoutes = require("./routes/message/messageRoutes");
const whatsappRoutes = require("./routes/whatsapp/whatsappRoutes");
const reminderRoutes = require("./routes/reminder/reminderRoutes");
const notificationRoutes = require("./routes/notification/notificationRoutes");
const pushRoutes = require("./routes/push/pushRoutes");

dotenv.config();

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://birth-buddy-bb.vercel.app",
  "https://birth-buddy-bb-iq66.vercel.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



app.use(express.json());

app.use("/uploads", express.static("uploads"));

// =========================
// ROUTES
// =========================

app.use("/api/auth", authRoutes);
app.use("/api", personRoutes);
app.use("/api", messageRoutes);
app.use("/api", whatsappRoutes);
app.use("/api", reminderRoutes);
app.use("/api", pushRoutes);
app.use("/api", notificationRoutes);

module.exports = app;