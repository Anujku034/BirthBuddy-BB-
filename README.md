# 🎂 BirthdayBuddy

### A Full-Stack Birthday Management, Personalized Messaging & Automated Reminder Platform

<p align="center">
  <strong>Manage birthdays. Create personalized wishes. Never miss an important birthday.</strong>
</p>

<p align="center">
  🌐 <a href="https://birth-buddy-bb-iq66.vercel.app"><strong>Live Demo</strong></a>
</p>

---

## 📌 Overview

**BirthdayBuddy** is a full-stack web application that helps users **manage birthdays, organize personal contacts, create personalized birthday messages, and receive automated reminders**.

Instead of keeping birthdays across phone contacts, notes, calendars, or separate reminder apps, BirthdayBuddy provides a single platform to manage everything in one place.

Users can:

- 👥 Manage people and their birthday information
- 🎂 Track today's and upcoming birthdays
- 💬 Create personalized birthday messages
- 📧 Receive automated email reminders
- 🔔 Receive in-app notifications
- 📱 Open WhatsApp with a personalized birthday message
- 🖼️ Upload and manage profile photos
- 🔐 Securely manage their account and sessions

The application is built with **React, Node.js, Express.js, MongoDB, Cloudinary, Nodemailer, Node-Cron, and Tailwind CSS**.

---

## ✨ Features

### 🔐 Authentication & Security

- User registration and login
- JWT-based authentication
- Access and refresh token system
- HTTP-only refresh-token cookies
- Protected API routes
- Secure password hashing using bcrypt
- Session restoration when access tokens expire
- Logout and token invalidation
- Environment variables for sensitive credentials

### 👥 Person Management

Users can create and manage birthday contacts with:

- Full name
- Phone number
- Date of birth
- Personal notes
- Profile photo
- Birthday reminder preferences
- Custom birthday messages

Supported operations:

**Create → View → Update → Delete**

### 🎂 Birthday Tracking

BirthdayBuddy automatically:

- Identifies today's birthdays
- Finds upcoming birthdays
- Calculates the next birthday occurrence
- Sorts birthdays according to their upcoming date
- Helps users avoid missing important birthdays

### 💬 Personalized Messaging

Users can create personalized birthday messages instead of relying only on predefined templates.

Messages can be associated with individual people and tracked through different states:

```text
pending
   │
   ├──→ sent
   │
   └──→ failed
```

### 📱 WhatsApp Integration

BirthdayBuddy can generate a personalized WhatsApp message using the person's stored phone number.

The application opens WhatsApp with the selected birthday message, allowing the user to review and send it.

### ⏰ Automated Birthday Reminders

A **Node-Cron scheduler** periodically checks birthday records and processes reminders automatically.

```text
Birthday Data
      ↓
Node-Cron Scheduler
      ↓
Check Today's Birthdays
      ↓
Process Reminder
      ↓
Email / In-App Notification
```

This means users don't need to manually check the application every day.

### 📧 Email Notifications

Birthday reminders can be delivered through email using **Nodemailer**.

### 🔔 In-App Notifications

Birthday-related reminders and events can also be displayed inside the application.

### 🖼️ Cloudinary Image Upload

Profile photos are uploaded to **Cloudinary**, while the resulting image URL is stored in MongoDB.

```text
Select Image
     ↓
FormData
     ↓
Multer
     ↓
Cloudinary
     ↓
Image URL
     ↓
MongoDB
```

### 🌙 Theme Support

The application supports:

- Light mode
- Dark mode

Theme state is managed using **React Context API** and styled with **Tailwind CSS**.

### 📱 Responsive Design

The UI is designed to work across:

- 💻 Desktop
- 📱 Mobile
- 📟 Tablet

---

# 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, Vite, Tailwind CSS |
| **Routing** | React Router |
| **State Management** | Context API |
| **HTTP Client** | Axios |
| **Icons** | Lucide React |
| **Backend** | Node.js, Express.js |
| **Authentication** | JWT, bcrypt |
| **Database** | MongoDB, Mongoose |
| **File Upload** | Multer |
| **Image Storage** | Cloudinary |
| **Email Service** | Nodemailer |
| **Scheduler** | Node-Cron |
| **API** | REST API |
| **Deployment** | Vercel, Render |
| **Version Control** | Git, GitHub |

---

# 🏗️ Application Architecture

```text
                         👤 USER
                           │
                           ▼
                ┌─────────────────────┐
                │   Vercel Frontend   │
                │    React + Vite     │
                └──────────┬──────────┘
                           │
                       REST API
                           │
                           ▼
                ┌─────────────────────┐
                │    Render Backend   │
                │   Node + Express    │
                └──────────┬──────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
      MongoDB         Cloudinary       Nodemailer
      Database        Image Storage     Email Service
                           │
                           ▼
                        WhatsApp
```

---

# 📂 Project Structure

```text
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
│   │
│   ├── .env
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   │   ├── auth/
│   │   ├── addperson/
│   │   └── message/
│   │
│   ├── middleware/
│   ├── models/
│   │
│   ├── routes/
│   │   ├── auth/
│   │   ├── person/
│   │   ├── message/
│   │   ├── whatsapp/
│   │   └── reminder/
│   │
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🔐 Authentication Flow

BirthdayBuddy uses an **access token + refresh token architecture**.

```text
User Login
    ↓
Validate Credentials
    ↓
bcrypt Password Verification
    ↓
Generate Access Token
    +
Generate Refresh Token
    ↓
Authenticated Session
```

### Access Token

The access token is used to authenticate protected API requests.

### Refresh Token

The refresh token is stored in an **HTTP-only cookie** and is used to generate a new access token when the existing access token expires.

```text
Access Token Expired
        ↓
Refresh Token Request
        ↓
Verify Refresh Token
        ↓
Generate New Access Token
        ↓
Retry Protected Request
```

If the refresh token is invalid or expired, the user is required to log in again.

---

# 🎂 Birthday Reminder Workflow

```text
Add Person
    ↓
Save Birthday Information
    ↓
Node-Cron Checks Birthday
    ↓
Identify Today's Birthday
    ↓
Create / Process Reminder
    ↓
Email Notification
    +
In-App Notification
    ↓
Personalized Birthday Message
    ↓
WhatsApp
```

This automated workflow allows BirthdayBuddy to handle birthday reminders without requiring users to manually check their contact list every day.

---

# 💬 Messaging System

BirthdayBuddy provides a dedicated messaging workflow for personalized birthday wishes.

### Message Lifecycle

```text
              ┌──────→ sent
pending ──────┤
              └──────→ failed
```

Messages can be created, updated, and tracked using their status.

Example:

```json
{
  "status": "pending"
}
```

Possible states:

| Status | Meaning |
|---|---|
| `pending` | Message is waiting to be processed |
| `sent` | Message has been successfully processed |
| `failed` | Message processing failed |

---

# 📡 REST API

The backend follows a modular REST API architecture using:

- Routes
- Controllers
- Middleware
- Models
- Services / Utilities

## 🔑 Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
```

## 🎂 Birthday & Messaging

```http
GET  /api/message/todays-birthdays
POST /api/message/send-birthday-message
GET  /api/message/recent-messages
PUT  /api/message/messages/:messageId/status
```

---

# 🖼️ Cloudinary Integration

BirthdayBuddy uses Cloudinary to store profile images.

```text
User
 │
 ▼
Select Profile Photo
 │
 ▼
FormData
 │
 ▼
Multer Middleware
 │
 ▼
Cloudinary
 │
 ▼
Cloudinary Image URL
 │
 ▼
MongoDB
```

MongoDB stores the image URL rather than storing the actual image file.

---

# ⚙️ Environment Variables

## Frontend

### Development

```env
VITE_API_URL=http://localhost:3000/api
```

### Production

```env
VITE_API_URL=https://birthbuddy-bb.onrender.com/api
```

## Backend

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret

EMAIL_USER=your_email

EMAIL_PASS=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloudinary_name

CLOUDINARY_API_KEY=your_cloudinary_key

CLOUDINARY_API_SECRET=your_cloudinary_secret
```

---

# 🚀 Run Locally

## 1. Clone the Repository

```bash
git clone <repository-url>
cd BirthdayBuddy
```

## 2. Start the Frontend

```bash
cd client
npm install
npm run dev
```

## 3. Start the Backend

Open another terminal:

```bash
cd server
npm install
npm start
```

The frontend and backend can then communicate through the configured API URL.

---

# ☁️ Production Deployment

BirthdayBuddy uses a separate deployment architecture:

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB |
| Image Storage | Cloudinary |
| Email Service | Nodemailer |

### Production Flow

```text
User
 ↓
Vercel
 ↓
React Application
 ↓
Render
 ↓
Express API
 ↓
MongoDB / Cloudinary / Nodemailer
```

---

# 🌐 Live Demo

**Frontend**

https://birth-buddy-bb-iq66.vercel.app

**Backend**

https://birthbuddy-bb.onrender.com

---

# 📈 Future Enhancements

The project can be extended with:

- 🤖 AI-powered personalized birthday messages
- 📱 Official WhatsApp Business Cloud API
- 🔔 Web Push Notifications
- 📅 Google Calendar integration
- 📅 Microsoft Outlook Calendar integration
- 📊 Birthday and messaging analytics
- 📝 Reusable message templates
- 🎁 Birthday gift recommendations
- 🔁 Automatic recurring calendar events

---

# 🎯 Project Objective

The main objective of BirthdayBuddy is to create a **single platform for managing birthdays and maintaining personal connections**.

The project brings together multiple real-world full-stack concepts, including:

- Authentication
- Authorization
- CRUD operations
- REST API development
- Database management
- JWT token handling
- File uploads
- Cloud storage
- Email services
- Background scheduling
- Messaging workflows
- Responsive UI
- Production deployment

This makes BirthdayBuddy more than a simple birthday reminder application—it is a practical demonstration of building and deploying a complete full-stack web application.

---

# 💡 Project Highlights

```text
React
Node.js
Express.js
MongoDB
Mongoose
REST APIs
JWT Authentication
bcrypt
Context API
Tailwind CSS
Cloudinary
Nodemailer
Node-Cron
Multer
WhatsApp Integration
Responsive UI
Git & GitHub
Vercel
Render
```

---

# 👨‍💻 What This Project Demonstrates

BirthdayBuddy demonstrates practical experience in:

**Frontend Development**  
React • Vite • Tailwind CSS • React Router • Axios • Context API

**Backend Development**  
Node.js • Express.js • REST APIs • Middleware • Controllers

**Database & Storage**  
MongoDB • Mongoose • Cloudinary

**Security & Authentication**  
JWT • bcrypt • HTTP-only Cookies • Protected Routes

**Automation & Communication**  
Node-Cron • Nodemailer • WhatsApp Integration

**Deployment**  
Vercel • Render • MongoDB Atlas

---

# ⭐ Support

If you find **BirthdayBuddy** useful or interesting, consider giving the repository a ⭐ on GitHub.

<p align="center">

### 🎂 Manage. Remember. Personalize. Celebrate.

**BirthdayBuddy — Never Miss an Important Birthday.**

🌐 **Live Demo:**  
https://birth-buddy-bb-iq66.vercel.app

</p>
