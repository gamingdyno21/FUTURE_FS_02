# Mini CRM - Client Lead Management System

A full-stack, premium web application built with the MERN stack (MongoDB, Express, React, Node.js) and TailwindCSS. Designed for agencies, freelancers, and startups to manage incoming leads and track them through a sales pipeline.

## 🚀 Features

- **Lead Capture:** Public-facing contact form for new leads to submit their details.
- **Admin Dashboard:** Secure, authenticated portal (JWT) to view all leads, analytics, and conversion metrics.
- **Lead Management:** View lead details, update status (New ➔ Contacted ➔ Converted) and track the pipeline.
- **Notes System:** Append timestamped follow-up notes to individual leads for comprehensive activity tracking.
- **Premium UI:** Smooth animations with Framer Motion, professional styling with TailwindCSS v4, and modern icons (Lucide React).
- **Security:** Passwords hashed with bcrypt, API routes protected by JWT tokens.

## 🛠️ Tech Stack

- **Frontend:** React (Vite), TailwindCSS v4, React Router, Framer Motion, Axios.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Atlas/Local) and Mongoose.
- **Authentication:** JSON Web Tokens (JWT) & bcrypt.

## 📦 Setup Instructions

### 1. Database & Environment Configuration

Navigate to the `server/` directory and configure your environment:
```bash
cd server
```
Ensure you update the `.env` file with your **MongoDB Atlas** connection string.
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster...
JWT_SECRET=supersecret_jwt_key
```

### 2. Seed Default Admin User

Run the seeding script to create your first login credentials (`admin` / `password`).
```bash
# Inside the server/ directory
npm run seed
```

### 3. Run the Backend Server

Start the Express backend on port `5000`.
```bash
npm run dev
```

### 4. Run the Frontend Application

Open a new terminal window, navigate to the `client/` directory, install dependencies (if not already done), and start Vite.
```bash
cd client
npm install
npm run dev
```

## 💻 Usage

- **Client View:** Navigate to `http://localhost:5173/` to see the public contact form and submit a new lead.
- **Admin Login:** Navigate to `http://localhost:5173/login`, use the default admin credentials (`admin` / `password`), and access your dashboard to manage inbound leads!
