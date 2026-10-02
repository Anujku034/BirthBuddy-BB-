# 🎂 BirthdayBuddy

BirthdayBuddy is a full-stack web application designed to help users manage birthdays, contacts, reminders, and birthday-related messages in one place.

The project is being developed step-by-step, with daily progress documented throughout the development journey.

---

## 🚀 Development Progress

### 📅 Day 1 — UI & Authentication Setup
**Date:** September 29, 2026

- Designed the initial dashboard UI
- Created Login and Signup pages
- Created Dashboard Layout
- Added Navbar and Sidebar
- Added routing for dashboard pages
- Created initial authentication structure
- Worked on authentication UI and styling

**Commit:** `ui & authentication`

---

### 📅 Day 2 — Authentication & Forgot Password Flow
**Date:** September 30, 2026

- Implemented user registration
- Implemented user login
- Added password hashing using bcrypt
- Implemented JWT authentication
- Added access token and refresh token
- Added HTTP-only refresh token cookie
- Implemented logout functionality
- Implemented forgot password
- Added OTP generation
- Added OTP email functionality using Nodemailer
- Implemented OTP verification
- Implemented password reset
- Added password validation
- Connected frontend authentication with backend APIs
- Added authentication error handling

**Commit:** `Implement authentication and forgot password flow`

---

### 📅 Day 3 — Authentication Completion & Dashboard Improvements
**Date:** October 1, 2026

- Completed the authentication flow
- Connected authentication state with the dashboard
- Added dynamic logged-in user information
- Added dynamic user avatar initials
- Implemented first-name and surname initials
- Added dynamic logout functionality
- Improved Dashboard Navbar user experience

**Examples:**
- `Anuj Kumar` → **A K**
- `Chotu Jha` → **C J**

**Commit:** `completed authentication`

---

### 📅 Day 4 — Add Person API
**Date:** October 2, 2026

- Connected `AuthContext` with the Add Person functionality
- Implemented protected Add Person API using JWT authentication
- Added Bearer access token to the Add Person request
- Implemented access-token expiry handling
- Added refresh-token flow when the access token expires
- Retried the Add Person request using the new access token
- Added session-expiry handling to redirect the user to the Login page
- Integrated profile photo upload using `FormData` and Multer
- Connected the Add Person frontend form with the backend API
- Fixed authenticated user identification using `req.user.userId`

**Commit:** `add person api`

---

## 🔐 Authentication Flow

```text
Signup
   ↓
Account Created
   ↓
Login
   ↓
Access Token + Refresh Token
   ↓
Dashboard
   ↓
Forgot Password
   ↓
OTP Verification
   ↓
Reset Password
