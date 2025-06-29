# 📌 TaskFlow - Todo Task Management Web Application

## 📝 Overview

**TaskFlow** is a full-stack todo management web application that allows users to sign in with Google, create and manage their tasks, share them with others, and receive real-time feedback. It is responsive, cleanly designed, and supports both personal and collaborative task tracking.

---

## ⚙️ Tech Stack

| Layer        | Tech Stack                         |
|--------------|------------------------------------|
| Frontend     | React, Tailwind CSS, Axios         |
| Backend      | Node.js, Express.js, JWT, OAuth 2.0 |
| Database     | MongoDB Atlas                      |
| Auth         | Google OAuth 2.0                   |
| Deployment   | Vercel (Frontend), Railway (Backend) |

---

## ✅ Features

- 🔐 Google login via OAuth 2.0
- 🧾 Create, edit, delete, and complete tasks
- 🧑‍🤝‍🧑 Share tasks with other users via email
- 🎉 Popup modal when all tasks are completed
- 🔎 Filter tasks by status, priority, and due date
- 🔄 Real-time feedback using polling or refresh
- 📱 Fully responsive design (desktop + mobile)
- 📦 Modular code with clean folder structure

---

## 🖥️ Folder Structure

taskflow-app/
├── todo-frontend/ # React frontend
│ └── src/components/
│ └── App.js, index.js
│ └── .env
├── todo-backend/ # Express backend
│ └── routes/tasks.js
│ └── models/
│ └── .env
└── README.md


---

## 🔐 OAuth Configuration

> Follow these steps to enable Google Login:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create an OAuth 2.0 Client ID
3. Add `http://localhost:3000` (for frontend) in the **Authorized JavaScript Origins**
4. Add `/auth/google/callback` (or similar route) to **Authorized Redirect URIs**
5. Add the credentials to your `.env` file like this:

```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

**Local Setup Instructions**
1. Clone the repository
git clone https://github.com/your-username/taskFlow-app.git
cd taskFlow-app

2.Setup Backend
cd todo-backend
npm install
#Create .env and add DB_URI, PORT, OAuth Client ID/Secret
npm start

3.Setup Frontend
cd ../todo-frontend
npm install
# Create .env and add API_URL (your backend base URL)
npm run dev

**🌐 Live Deployment Links**
https://taskflow-complete-flow.lovable.app/

**🧠 Assumptions**
Only Google login implemented for OAuth (other providers optional)
Real-time updates are simulated using useEffect and state refresh
Tasks are scoped per user by token
Shared users see shared tasks under their account

**🖼️ Architecture Diagram**
                                ┌────────────────────┐
                                │   👤 End Users      │
                                └────────┬───────────┘
                                         │
                          ┌──────────────▼──────────────┐
                          │     🌐 Frontend (React)     │
                          │ Vercel / Netlify / Firebase │
                          └──────────────┬──────────────┘
                                         │ API Calls (HTTPS)
                                         ▼
                     ┌────────────────────────────┐
                     │   Backend (Node.js/Express) │
                     │ Fly.io / Railway / Render   │
                     └──────────────┬──────────────┘
                                    │
               ┌────────────────────▼────────────────────┐
               │   🛡️ Authentication & Authorization     │
               │  (OAuth 2.0 - Google / GitHub Login)     │
               └────────────────────┬────────────────────┘
                                    │
                     ┌──────────────▼─────────────┐
                     │     💾 Database (MongoDB)  │
                     │    MongoDB Atlas / Supabase│
                     └────────────────────────────┘

**Explanation of the Flow:**
**Frontend (React):**
1.Includes login screen (OAuth), dashboard, task list, and UI components.
2.Communicates with backend APIs via Axios.

**Authentication (OAuth):**
1.Users log in via Google or GitHub.
2.JWT token stored in localStorage for session management.

**Backend (Node.js + Express):**
1.Handles routes: /api/tasks, /auth, etc.
2.Handles user-specific and shared tasks.
3.Deployed on Railway, Render, or Fly.io.
4.ncludes WebSocket server for real-time updates (optional).

**Database:**
stores:
Users
Tasks
Shared Task Access
Customizations (theme, profile info)

**Real-time Updates (optional):**
WebSocket or polling can be used for auto-refreshing task lists.



**🎥 Loom Video (Demo)**
https://drive.google.com/file/d/1Udr-4KzBpmQu79XdQ0TYNLra9CG2Tks2/view?usp=drive_link

---
This project is a part of a hackathon run by https://www.katomaran.com
