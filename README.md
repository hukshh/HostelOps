# 🏨 HostelOps

> **A production-grade Smart Hostel & PG Management System** built with the MERN stack.
> Replaces manual registers, WhatsApp groups, and Excel sheets with a centralized digital platform.

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Stack](https://img.shields.io/badge/Stack-MERN-blue)
![Roles](https://img.shields.io/badge/Roles-3%20(Admin%20%7C%20Warden%20%7C%20Student)-green)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## 🚀 Live Demo
> Coming soon — deploying on Vercel (Frontend) + Render (Backend) + MongoDB Atlas

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Design](#system-design)
- [Phase-wise Build Plan](#phase-wise-build-plan)
- [Getting Started](#getting-started)

---

## Overview

HostelOps digitizes every operational aspect of hostel management:

| Problem | Solution |
|---|---|
| Manual rent registers | Online payment + automated receipts |
| WhatsApp complaint chaos | Structured complaint tracker with SLA |
| Paper attendance | QR-code daily attendance |
| No leave system | Leave application + QR leave pass |
| No mess feedback | Weekly menu + meal rating system |
| No visitor log | Digital visitor pre-registration |
| Bulletin board notices | Digital notice board with acknowledgement |
| No inter-student platform | Lost & Found + Student Marketplace |

---

## Features

### 3-Role System
- **Admin** — Full control: rooms, students, reports, analytics
- **Warden** — Block management: attendance, leave review, visitor log
- **Student** — Self-service portal: pay rent, raise complaints, apply leave

### Core Modules (14 total)
1. 🔐 Authentication (JWT + OTP email verification)
2. 🏠 Room Management
3. 💳 Rent & Payments (Razorpay)
4. 🛠️ Complaint & Maintenance (Cloudinary photos)
5. 📋 Attendance (QR-based daily check-in)
6. 🚪 Leave Management (QR-coded leave pass PDF)
7. 🍛 Mess Management & Meal Ratings
8. 📢 Notice Board (with priority & acknowledgement)
9. 👥 Visitor Management
10. 🔍 Lost & Found Board
11. 🛒 Student Marketplace
12. 🔔 Real-Time Notifications (Socket.io)
13. 📊 Analytics Dashboard (Recharts)
14. 📄 PDF Reports (pdfkit)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite, Tailwind CSS, shadcn/ui, Recharts, Framer Motion |
| State | React Query + Context API |
| Forms | React Hook Form + Zod |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (Access + Refresh Token) |
| Real-time | Socket.io |
| Payments | Razorpay SDK + Webhooks |
| Media | Cloudinary |
| PDF | pdfkit |
| Email | Nodemailer |
| QR | qrcode (npm) |
| Scheduler | node-cron |
| Validation | Zod |
| Deployment | Vercel + Render + MongoDB Atlas |

---

## System Design

### Architecture: Controller → Service → Repository

```
Request → Route → Middleware (Auth/RBAC) → Controller → Service → Repository → MongoDB
```

- **Controller**: Handles HTTP, calls service, sends response
- **Service**: Business logic, orchestration
- **Repository**: DB queries via Mongoose

### OOP Design
- `User` base class → `Admin`, `Warden`, `Student` (inheritance)
- SOLID principles applied throughout service layer
- Centralized async error handler (no try-catch in controllers)

### See detailed diagrams:
- [ER Diagram](./ErDiagram.md)
- [Class Diagram](./classDiagram.md)
- [Use Case Diagram](./useCaseDiagram.md)
- [Sequence Diagrams](./sequenceDiagram.md)

---

## Phase-wise Build Plan

| Phase | Focus | Timeline |
|---|---|---|
| 1 | Backend skeleton, models, JWT Auth + OTP | Week 1–2 |
| 2 | Rooms, Students, Admin CRUD APIs | Week 3 |
| 3 | React frontend, design system, 3 dashboards | Week 4–5 |
| 4 | Payments (Razorpay) + PDF receipts + Email | Week 6–7 |
| 5 | Complaints, Attendance (QR), Leave + Leave Pass | Week 8–9 |
| 6 | Mess, Notice Board, Visitor Management | Week 10 |
| 7 | Lost & Found, Marketplace, Real-Time (Socket.io) | Week 11 |
| 8 | Analytics, PDF Reports, CI/CD, Deployment | Week 12 |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/hukshh/HostelOps.git

# Backend
cd server
npm install
cp .env.example .env   # fill in your env vars
npm run dev

# Frontend
cd client
npm install
npm run dev
```

### Environment Variables (Backend)
```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_ACCESS_SECRET=your_secret
JWT_REFRESH_SECRET=your_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
EMAIL_USER=your_gmail
EMAIL_PASS=your_app_password
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```
