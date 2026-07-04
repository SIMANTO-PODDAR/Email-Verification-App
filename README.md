<div align="center">

# 📧 Email Verification App

**A authentication system built with Next.js, featuring email verification, Google OAuth, and real-time login notifications.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.4.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Better Auth](https://img.shields.io/badge/Better--Auth-1.6.23-purple?style=for-the-badge)](https://better-auth.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5.6.6-FF69B4?style=for-the-badge)](https://daisyui.com/)

</div>

---

### Server Repo: [email-verification-app-server](https://github.com/SIMANTO-PODDAR/email-verification-app-server.git)

## 🌟 Overview

The **Email Verification App** is an authentication system built on top of **Next.js 16 (App Router)**. It provides a seamless, secure user authentication experience with:

- 📬 **Email-triggered notifications** on every sign-up and login event
- 🔐 **OAuth 2.0** via Google for one-click social login
- 🗄️ **MongoDB Atlas** as a scalable cloud database
- ✅ **Email verification status** displayed on the user profile

It also connects to a separate **external email verification backend** that handles sending notification emails to users when they sign up or log in.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📝 **Sign Up** | Register with name, email & password |
| 🔑 **Log In** | Authenticate via email/password credentials |
| 🌐 **Google OAuth** | One-click sign-in with Google |
| 📧 **Email Notifications** | Automated emails sent on SignUp & LogIn events |
| 👤 **Profile Page** | View name, email, and verification status |
| ✅ **Email Verified Badge** | Shows if the user's email is verified |
| 🚪 **Sign Out** | Secure session termination |
| 🍞 **Toast Notifications** | Real-time feedback on all auth actions |
| 🛡️ **Protected Routes** | Profile page requires authentication |

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2.9 | React framework with App Router |
| **React** | 19.2.4 | UI component library |
| **TailwindCSS** | v4 | Utility-first CSS styling |
| **DaisyUI** | 5.6.6 | Pre-built Tailwind component library |
| **React Toastify** | 11.1.0 | Toast notification system |
| **Geist Font** | - | Typography (Sans + Mono) |

### Backend & Auth

| Technology | Version | Purpose |
|---|---|---|
| **Nodemailer** | 9.0.3 | For sending emails |
| **Better Auth** | 1.6.23 | Authentication framework |
| **@better-auth/mongo-adapter** | 1.6.23 | MongoDB adapter for Better Auth |
| **MongoDB** | 7.4.0 | NoSQL database driver |
| **MongoDB Atlas** | - | Cloud-hosted database |
| **Google OAuth** | - | Social authentication provider |

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** >= 18.x
- **npm** >= 9.x
- A **MongoDB Atlas** account and cluster
- A **Google Cloud Console** project with OAuth 2.0 credentials
- The **external email verification backend** running on port `5000`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SIMANTO-PODDAR/Email-Verification-App.git

# 2. Navigate to the project directory
cd email-verification-app

# 3. Install dependencies
npm install

# 4. Set up environment variables (see below)
cp .env.example .env

# 5. Start the development server
npm run dev
```

The app will be available at **<http://localhost:3000>**

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# ─── Better Auth ────────────────────────────────────────────
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_key_here

# ─── MongoDB ────────────────────────────────────────────────
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0

# ─── Google OAuth ───────────────────────────────────────────
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ─── External Email Service ─────────────────────────────────
NEXT_PUBLIC_BASE_URL=http://localhost:5000
```

> ⚠️ **Warning:** Never commit your `.env` file. It is already listed in `.gitignore`.

#### How to get each key

| Key | Where to get it |
|---|---|
| `BETTER_AUTH_SECRET` | Generate any random 32+ char string |
| `MONGODB_URI` | [MongoDB Atlas](https://cloud.mongodb.com/) → Connect → Drivers |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials |
| `NEXT_PUBLIC_BASE_URL` | URL of your external email verification backend |

---

## ⚙️ How It Works

### Authentication Flow

```
Sign Up:
  1. User fills Name, Email, Password
  2. Better Auth creates session + stores user in MongoDB
  3. sendEmail() fires → POST to external backend (/verify-email)
  4. User redirected to /profile

Log In:
  1. User enters Email + Password
  2. Better Auth validates credentials against MongoDB
  3. sendEmail() fires → POST to external backend (/verify-email)
  4. User session established, redirect to /profile

Google OAuth:
  1. User clicks "Sign In with Google"
  2. Redirected to Google Consent Screen
  3. Google returns OAuth token
  4. Better Auth exchanges token and creates/updates user in MongoDB
  5. User session established

Sign Out:
  1. User clicks "Log Out" in Navbar
  2. Better Auth invalidates session
  3. User redirected to /login
```

### Email Notification Service

The `sendEmail.js` utility makes a `POST` request to an **external backend** at `NEXT_PUBLIC_BASE_URL/verify-email` with:

```json
{
  "Name": "User Name",
  "Email": "user@example.com",
  "EmailFor": "SignUp" | "LogIn"
}
```

This allows the backend to send a custom notification email to the user on each auth event.

---

## 📄 Pages & Routes

| Route | Page | Auth Required | Description |
|---|---|---|---|
| `/` | `page.js` | ❌ | Home / Welcome screen |
| `/signup` | `(auth)/signup/page.jsx` | ❌ | New user registration |
| `/login` | `(auth)/login/page.jsx` | ❌ | User login |
| `/profile` | `profile/page.jsx` | ✅ | User profile & verification status |

---

## 🧩 Components

### `<Navbar />`

Located at `src/components/Navbar/Navbar.jsx`

- Displays navigation links: **Home**, **Profile**, **Sign Up**, **Log In**, **Log Out**
- Dynamically disables **Log In** when a user is already logged in
- Dynamically disables **Log Out** when no session exists
- Uses `authClient.useSession()` for reactive session state

### `<GoogleLogin />`

Located at `src/components/GoogleLogIn/GoogleLogin.jsx`

- Renders the **"Sign in with Google"** button
- Triggers the Google OAuth flow via Better Auth's `signIn.social()` method

---

## 👤 Author

**Simanto Poddar**

- GitHub: [@SIMANTO-PODDAR](https://github.com/SIMANTO-PODDAR)

---

<div align="center">

Made with ❤️ using **Next.js** & **Better Auth**

⭐ Star this repo if you found it helpful!

</div>
