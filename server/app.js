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

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
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