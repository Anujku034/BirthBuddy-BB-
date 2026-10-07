const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/db.js");
const startBirthdayReminderScheduler = require("./utils/birthdayReminderScheduler");

dotenv.config();

const port = process.env.PORT || 3000;

// =========================
// DATABASE
// =========================

connectDB();

// =========================
// BIRTHDAY REMINDER SCHEDULER
// =========================

startBirthdayReminderScheduler();

// =========================
// START SERVER
// =========================

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});