# HostelOps – Smart Hostel / PG Management System (v2.0)

## 1. Project Overview

HostelOps is a production-grade Full Stack MERN application designed to completely digitize
hostel and PG management operations. The system replaces manual registers, Excel sheets,
and WhatsApp communication with a centralized, intelligent digital platform.

The primary focus of this project is backend system design, clean architecture, real-time
operations, third-party integrations, and proper implementation of OOP + SOLID principles.

---

## 2. Problem Statement

Traditional hostel management suffers from:

- Manual rent tracking with no payment history
- No structured complaint or maintenance system
- No attendance monitoring or leave management
- Lack of financial transparency and reporting
- Poor inter-communication between admin and students
- No visitor or gate management
- No mess management or meal feedback system
- Students have no self-service portal

---

## 3. User Roles (3 Roles)

### 1. Admin (Hostel Owner / Manager)
- Full system control
- Manage rooms, students, wardens
- View revenue dashboard and analytics
- Generate monthly financial PDF reports
- Broadcast notices to all students
- Manage mess menu
- Approve/reject leave applications
- Handle and escalate complaints
- Visitor log access

### 2. Warden (Floor / Block Supervisor)
- View students assigned to their block
- Mark and monitor attendance
- Review and respond to complaints
- Approve/reject leave requests
- Log visitor entries
- Post block-level notices

### 3. Student (Tenant)
- Self-registration and profile management
- View room details and roommates
- Mark daily attendance (QR-based)
- Apply for leave with reason
- Raise and track complaints
- View rent dues and pay online
- Download payment receipts (PDF)
- View and rate mess menu
- View notice board
- Lost & Found board
- Student-to-student marketplace
- Track visitor log

---

## 4. Core Features

### Authentication & Authorization
- JWT Access Token + Refresh Token
- 3-role RBAC middleware
- OTP-based email verification on registration
- Password reset via email OTP
- Logout all devices (refresh token revocation)

### Room Management
- CRUD rooms with floor, type, capacity, amenities
- Assign/remove students
- Occupancy status: Available / Partial / Full
- Room types: Single / Double / Triple / Dormitory
- Visual room grid on admin dashboard

### Rent & Payment Management
- Monthly rent tracking per student
- Payment status: Paid / Pending / Overdue
- Razorpay online payment + webhook confirmation
- PDF receipt auto-generation (pdfkit)
- Email reminders 3 days before due date (Nodemailer)
- Monthly revenue analytics

### Complaint & Maintenance System
- Categories: Electrical / Plumbing / Cleanliness / Internet / Furniture / Other
- Status pipeline: Open → Assigned → In Progress → Resolved
- Photo attachment on complaints (Cloudinary)
- Admin response thread per complaint
- SLA tracking: average resolution time on dashboard

### Attendance System
- Daily attendance by Warden
- QR-code self-check-in (daily rotating QR — expires midnight)
- Monthly attendance % per student
- Floor-wise/block-wise attendance for admin

### Leave Management
- Student submits leave: dates, reason, destination
- Warden reviews: approve / reject with remarks
- Auto-generated QR-coded Leave Pass PDF on approval
- Gate can scan QR to verify pass authenticity
- Leave history per student

### Mess Management
- Admin publishes weekly menu (breakfast/lunch/dinner)
- Students rate each meal (1–5 stars + comment)
- Meal opt-out per day (helps mess planning)
- Special dietary request system

### Notice Board
- Notices with priority: Normal / Important / Urgent
- Urgent notices as dashboard banner
- Notices have expiry dates (auto-archive)
- Student acknowledgement tracking

### Visitor Management
- Student pre-registers visitor (name, phone, purpose, date/time)
- Warden logs actual entry/exit
- Visitor log for admin
- Auto-expire after 24 hours

### Lost & Found Board
- Post with photo, description, location
- Status: Lost / Found / Claimed
- Admin moderation
- Auto-archive after 30 days

### Student Marketplace
- Sell items within hostel (Books / Electronics / Furniture / Other)
- Photo upload (Cloudinary)
- In-app contact between buyer and seller
- Auto-expire after 60 days

### Real-Time Notifications (Socket.io)
- Bell icon with unread count
- Events: complaint update, leave decision, new notice, rent reminder, visitor arrived
- Stored in DB, loaded on page refresh

### Reports & Exports
- Monthly financial PDF report
- Attendance CSV/PDF export
- Complaint resolution report

---

## 5. Technology Stack

### Frontend
- React.js + Vite
- Tailwind CSS + shadcn/ui
- Recharts
- Framer Motion
- React Query
- React Hook Form + Zod
- Socket.io-client
- PWA support

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (Access + Refresh Token)
- Socket.io
- Nodemailer
- Razorpay SDK
- Cloudinary SDK
- pdfkit
- node-cron
- qrcode npm package
- Zod (validation)

### Deployment
- GitHub Actions CI/CD
- Render.com (backend)
- Vercel (frontend)
- MongoDB Atlas
- Cloudinary

---

## 6. System Design

- Controller → Service → Repository (3-layer architecture)
- OOP: User → Admin / Warden / Student inheritance
- SOLID principles in service layer
- Centralized error handling (asyncHandler wrapper)
- Event-driven notifications (Socket.io)
- Scheduled jobs (node-cron): rent reminders, auto-archiving
- Webhook-based payment confirmation

---

## 7. Database Collections (14 total)

1. users
2. rooms
3. payments
4. complaints
5. attendance
6. leaves
7. notices
8. visitors
9. messMenus
10. mealRatings
11. lostFound
12. marketplace
13. notifications
14. refreshTokens
