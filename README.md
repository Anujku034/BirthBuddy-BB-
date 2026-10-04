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

- Implemented user registration and login
- Added password hashing using bcrypt
- Implemented JWT authentication
- Added access token and refresh token
- Added HTTP-only refresh token cookie
- Implemented logout functionality
- Implemented forgot password with OTP
- Added OTP email functionality using Nodemailer
- Implemented OTP verification and password reset
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
Protected API Request
   ↓
Access Token Validation
   ↓
Token Expired?
   ↓
Refresh Token
   ↓
New Access Token
   ↓
Retry Request
```
### 📅 Day 4 — Add Person API

**Date:** October 2, 2026

* Connected `AuthContext` with Add Person functionality
* Implemented protected Add Person API using JWT authentication
* Added Bearer access token to API requests
* Implemented access-token expiry handling
* Added refresh-token flow when the access token expires
* Added automatic request retry with the new access token
* Added session-expiry handling and Login redirect
* Integrated profile photo upload using `FormData` and Multer
* Connected Add Person frontend with backend API
* Fixed authenticated user identification using `req.user.userId`
* Implemented Get All Persons API
* Implemented Get Person By ID API
* Implemented Delete Person API
* Implemented Edit/Update Person API

**Commit:** `add person api`

### 📅 Day 5 — Cloudinary Image Storage & Profile Photo Retrieval

**Date:** October 3, 2026

* Integrated Cloudinary for profile photo storage
* Configured Cloudinary with Multer
* Uploaded profile photos directly to Cloudinary
* Stored Cloudinary image URLs in MongoDB
* Updated Add Person API for Cloudinary image storage
* Updated Edit Person API to handle profile photos
* Preserved existing profile photo when no new photo is selected
* Added existing Cloudinary photo retrieval in Edit Person
* Added preview for existing and newly selected photos
* Tested profile photo upload and retrieval successfully

**Commit:** `integrate cloudinary image storage`
