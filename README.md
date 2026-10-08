# 🎂 BirthdayBuddy

### A Full-Stack Birthday Management, Personalized Messaging & Automated Reminder Platform

<p align="center">
  <strong>Manage birthdays. Create personalized wishes. Never miss an important birthday.</strong>
</p>

<p align="center">
  🌐 <a href="https://birth-buddy-bb-iq66.vercel.app"><strong>Live Demo</strong></a>
</p>

---

## 📌 About The Project

**BirthdayBuddy** is a modern full-stack web application designed to help users manage birthdays, organize personal contacts, create personalized birthday messages, and receive automated reminders.

Instead of maintaining birthdays across phone contacts, notes, calendars, or separate reminder applications, BirthdayBuddy provides a centralized platform where users can securely manage people and birthdays, upload profile photos, create custom wishes, receive email and in-app reminders, and use WhatsApp to send personalized birthday messages.

The application is built using **React, Node.js, Express.js, MongoDB, Cloudinary, Nodemailer, Node-Cron, and Tailwind CSS**, with the frontend deployed on **Vercel** and backend deployed on **Render**.

---

## ✨ Key Features

- 🔐 **Secure Authentication** — Registration, login, logout, JWT access/refresh tokens, protected routes, and session restoration.
- 🔑 **Forgot Password & OTP** — OTP-based password recovery with email delivery using Nodemailer.
- 👥 **Person Management** — Add, edit, delete, and manage people with name, phone number, date of birth, notes, and profile photo.
- 🎂 **Birthday Tracking** — Automatically identifies today's and upcoming birthdays and sorts them according to their next occurrence.
- 💬 **Personalized Messages** — Create, update, and manage custom birthday messages instead of fixed templates.
- 📱 **WhatsApp Integration** — Opens WhatsApp with the selected person's phone number and personalized message.
- 📊 **Message Status Tracking** — Supports `pending`, `sent`, and `failed` message states.
- ⏰ **Automated Birthday Scheduler** — Node-Cron automatically checks birthdays and processes reminders.
- 📧 **Email Reminders** — Birthday reminders are delivered through Nodemailer.
- 🔔 **In-App Notifications** — Birthday-related notifications are available inside the application.
- 🖼️ **Cloudinary Integration** — Profile photos are uploaded to Cloudinary and their URLs are stored in MongoDB.
- 🌙 **Dark/Light Mode** — Theme management using React Context API and Tailwind CSS.
- 📱 **Responsive UI** — Designed for desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | React, Vite, Tailwind CSS, React Router, Axios, Context API, Lucide React |
| **Backend** | Node.js, Express.js, JWT, bcrypt, Nodemailer, Node-Cron, Multer, CORS |
| **Database** | MongoDB, Mongoose |
| **Cloud Services** | Cloudinary |
| **Deployment** | Vercel, Render |
| **Version Control** | Git, GitHub |

---

## 🏗️ Architecture

```text
                         USER
                           │
                           ▼
                ┌─────────────────────┐
                │   Vercel Frontend   │
                │    React + Vite     │
                └──────────┬──────────┘
                           │
                    HTTPS / REST API
                           │
                           ▼
                ┌─────────────────────┐
                │    Render Backend   │
                │   Node + Express    │
                └──────────┬──────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
          MongoDB      Cloudinary   Nodemailer
          Database     Image Store   Email Service
                           │
                           ▼
                        WhatsApp

```
##📂 Project Structure

BirthdayBuddy/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   │   ├── auth/
│   │   ├── addperson/
│   │   └── message/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   │   ├── auth/
│   │   ├── person/
│   │   ├── message/
│   │   ├── whatsapp/
│   │   └── reminder/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md

## 🔐 Authentication & Security

User Login
    ↓
Validate Credentials
    ↓
bcrypt Password Verification
    ↓
Generate Access + Refresh Tokens
    ↓
Authenticated Session
The access token is used for protected API requests, while the refresh token is stored in an HTTP-only cookie and used to restore the session when the access token expires.
Security practices include:
- bcrypt password hashing
- JWT authentication
- HTTP-only refresh-token cookies
- Protected API routes
- User-specific database records
- CORS configuration
- Environment variables for sensitive credentials

## 🎂 Birthday & Reminder Workflow

Add Person
    ↓
Store Birthday Information
    ↓
Birthday Scheduler Checks Date
    ↓
Identify Today's Birthday
    ↓
Process Reminder
    ↓
Email / In-App Notification
    ↓
Create Personalized Message
    ↓
Open WhatsApp
    ↓
Send Birthday Wish
The application uses Node-Cron to automatically process birthday reminders without requiring the user to manually check the application every day.
💬 Messaging System
Users can create their own birthday messages and the exact message is stored with the corresponding person.
Messages can have the following states:
pending → sent
    └──→ failed

📡 REST API
The backend follows a REST-style architecture with separate routes, controllers, middleware, and models.

## Authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
## Birthday & Messaging
GET  /api/message/todays-birthdays
POST /api/message/send-birthday-message
GET  /api/message/recent-messages
PUT  /api/message/messages/:messageId/status

## 🖼️ Cloudinary Image Flow

User Selects Image
       ↓
FormData
       ↓
Express + Multer
       ↓
Cloudinary
       ↓
Image URL
       ↓
MongoDB

## ⚙️ Environment Variables
##FRONTEND:
VITE_API_URL=http://localhost:3000/api
##Production:
VITE_API_URL=https://birthbuddy-bb.onrender.com/api
##BACKEND:
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

## 🚀 Run Locally(Clone Repository)

git clone <repository-url>
cd BirthdayBuddy
## FRONTEND
cd client
npm install
npm run dev
## BACKEND
cd server
npm install
npm start

## ☁️ Production Deployment
BirthdayBuddy uses a separate frontend and backend deployment architecture.
Frontend  → Vercel
Backend   → Render
Database  → MongoDB
Images    → Cloudinary
Emails    → Nodemailer

🌐 Live Website
https://birth-buddy-bb-iq66.vercel.app
⚙️ Production Backend
https://birthdbuddy-bb.onrender.com

## 📈 Future Enhancements
🤖 AI-powered personalized birthday messages
📱 Official WhatsApp Business Cloud API
🔔 Web Push Notifications
📅 Google Calendar integration
📅 Outlook Calendar integration
📊 Birthday and messaging analytics
📝 Reusable message templates
🎁 Birthday gift suggestions
🔁 Automatic recurring calendar events

## 🎯 Project Objective
The goal of BirthdayBuddy is to provide a single platform for managing birthdays, maintaining personal connections, creating meaningful wishes, and receiving automated reminders.
It combines authentication, CRUD operations, database management, cloud storage, email services, scheduled background jobs, messaging workflows, responsive UI, and production deployment into one complete full-stack application.
💡 Manage. Remember. Personalize. Celebrate. 🎂

## 👨‍💻 Project Highlights
This project demonstrates practical experience in:
Full-Stack Development • React • Node.js • Express.js • REST APIs • MongoDB • Mongoose • JWT Authentication • bcrypt • Context API • Tailwind CSS • Cloudinary • Nodemailer • Node-Cron • WhatsApp Integration • Responsive UI • Git/GitHub • Vercel • Render • Production Deployment

⭐ Support
If you find BirthdayBuddy useful or interesting, consider giving the repository a ⭐ on GitHub.
🌐 Live Demo
https://birth-buddy-bb-iq66.vercel.app

This is the version I'd use as your **final GitHub README**. It combines the project description, features, architecture, structure, authentication, messaging, scheduler, APIs, security, setup, deployment, and future scope without becoming unnecessarily repetitive.

