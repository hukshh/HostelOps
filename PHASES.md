# HostelOps – Phase-wise Build Plan (v2.0)

> 12-week plan to build a production-grade hostel management system
> Stack: MERN (React + Node + Express + MongoDB) | No Docker | Normal JWT Auth

---

## ✅ Phase 0 — DONE: System Design & Planning

What's already completed:
- ER Diagram (14 collections, all relationships)
- Class Diagram (3-role OOP inheritance)
- Use Case Diagram (40+ use cases)
- Sequence Diagrams (4 critical flows)
- Tech stack finalized
- Architecture decided: Controller → Service → Repository

**Resume value:** Shows design-first thinking before writing any code.

---

## Phase 1 — Backend Foundation + Auth System (Week 1–2)

### Goal
Build the entire backend skeleton and authentication system.

### Folder Structure
```
server/
├── config/         db.js, cloudinary.js
├── controllers/
├── services/
├── repositories/
├── models/         All 14 Mongoose schemas
├── middlewares/    auth.js, rbac.js, errorHandler.js, asyncHandler.js
├── routes/
├── utils/          sendEmail.js, generatePDF.js, generateQR.js
├── jobs/           rentReminder.js (node-cron)
└── app.js / server.js
```

### Tasks
- All 14 Mongoose models matching ER Diagram exactly
- User model with role field (admin / warden / student)
- JWT Access Token (15min) + Refresh Token (7d) system
  - POST /auth/register → save user + send OTP email
  - POST /auth/verify-otp → verify + mark isVerified
  - POST /auth/login → return access + refresh tokens
  - POST /auth/refresh → new access token from refresh token
  - POST /auth/logout → delete refresh token from DB
  - POST /auth/forgot-password → send OTP
  - POST /auth/reset-password → verify OTP + update password
- RBAC middleware: guard routes by role
- asyncHandler wrapper (no try-catch in controllers)
- Global error handler middleware
- Zod validation middleware
- node-cron job scaffolding (rent reminder, auto-archive)

**Resume line:** *"Implemented JWT refresh token rotation with OTP-based email verification and centralized RBAC middleware"*

---

## Phase 2 — Room & Student Management APIs (Week 3)

### Goal
All CRUD for rooms + student profile management.

### APIs to build
- POST /rooms — create room
- GET /rooms — list all with occupancy status
- GET /rooms/:id — room details + students inside
- PATCH /rooms/:id — update room info
- DELETE /rooms/:id — delete room
- POST /rooms/:id/assign — assign student to room
- DELETE /rooms/:id/remove/:studentId — remove student

- GET /students — list all students (admin)
- GET /students/:id — student profile
- PATCH /students/:id — update profile
- POST /upload/profile-photo — Cloudinary image upload

### Key Logic
- When assigning a student: check capacity, update currentOccupancy
- Room status: Available (0 < cap), Partial, Full (occ == cap)
- Students can only view their own profile; Admin sees all

**Resume line:** *"Built room allotment system with capacity enforcement and real-time occupancy tracking"*

---

## Phase 3 — Frontend: Design System + 3 Dashboards (Week 4–5)

### Goal
Build the complete React frontend with 3 role-specific layouts.

### Setup
- React + Vite + Tailwind CSS + shadcn/ui
- React Router v6 with protected routes per role
- Axios instance: auto-attach access token, auto-refresh on 401
- React Query for all server state (caching, refetch)
- React Hook Form + Zod for all forms
- Framer Motion for page transitions

### Pages to build
**Shared:** Login, Register, OTP Verify, Forgot Password

**Admin Dashboard:**
- Overview: KPI cards (total students, revenue, occupancy %, open complaints)
- Room grid: color-coded by occupancy
- Recharts: Monthly revenue bar chart, complaint status donut, payment status breakdown

**Warden Dashboard:**
- Block overview: students in their block
- Pending leaves and complaints
- Today's attendance summary

**Student Portal:**
- Home: rent status, attendance %, active complaint, upcoming leave
- Sidebar navigation to all modules

**Resume line:** *"Built 3 role-specific dashboards with React Query caching, Recharts visualizations, and automatic JWT refresh"*

---

## Phase 4 — Payments, PDF Receipts & Email (Week 6–7)

### Goal
Full Razorpay integration + PDF generation + email notifications.

### Razorpay Flow (exact sequence diagram implementation)
1. POST /payments/create-order → create Razorpay order
2. Frontend opens Razorpay modal
3. Student completes payment
4. POST /payments/verify → HMAC signature verification
5. Update payment status in DB
6. Generate PDF receipt (pdfkit) + upload to Cloudinary
7. Send email with receipt attached (Nodemailer)

### node-cron Job
- Runs daily at 9am
- Finds students with rent due in 3 days
- Sends reminder email to each

### APIs
- GET /payments/my — student payment history
- GET /payments/all — admin view all payments
- GET /payments/report?month=&year= — monthly summary

**Resume line:** *"Integrated Razorpay with HMAC webhook verification, pdfkit receipt generation, and cron-based email reminders"*

---

## Phase 5 — Complaints, QR Attendance & Leave System (Week 8–9)

### Goal
The three most technically interesting features.

### Complaint System
- POST /complaints — create with category + photo (Cloudinary)
- PATCH /complaints/:id/assign — warden assigns to self
- PATCH /complaints/:id/status — update status
- PATCH /complaints/:id/respond — admin/warden response
- GET /complaints/sla-stats — avg resolution time (admin)

### QR Attendance (Daily Rotating Token)
- POST /attendance/generate-qr
  - Creates JWT: { date: today, type: "attendance" } expires at 23:59
  - Returns QR code image
- POST /attendance/checkin
  - Verifies token: valid JWT + date == today + not already marked
  - Creates attendance record
- GET /attendance/monthly/:studentId — monthly stats
- GET /attendance/today — today's list (warden)

### Leave Management
- POST /leaves — student applies
- GET /leaves/pending — warden fetches pending
- PATCH /leaves/:id/review — approve/reject + remark
  - On approve: generate QR code + embed in PDF leave pass (pdfkit)
  - Upload PDF to Cloudinary
  - Save URL in leave record
  - Notify student via Socket.io + email
- GET /leaves/:id/pass — download leave pass

**Resume line:** *"Built QR-based daily rotating attendance (prevents proxy) and auto-generated QR-coded PDF leave passes"*

---

## Phase 6 — Mess, Notice Board & Visitor Management (Week 10)

### Goal
Three community-focused modules.

### Mess Management
- POST /mess-menu — admin publishes weekly menu
- GET /mess-menu/current — current week menu
- POST /mess-menu/rate — student rates a meal
- GET /mess-menu/ratings — avg ratings per meal (admin)
- PATCH /mess-menu/optout — student opts out of a meal

### Notice Board
- POST /notices — admin/warden posts (title, content, priority, expiresAt)
- GET /notices — all active notices
- PATCH /notices/:id/acknowledge — student acknowledges
- node-cron: auto-archive expired notices daily

### Visitor Management
- POST /visitors — student pre-registers visitor
- PATCH /visitors/:id/entry — warden logs entry time
- PATCH /visitors/:id/exit — warden logs exit time
- GET /visitors — admin views full log
- GET /visitors/my — student views own visitor history
- node-cron: auto-expire pending visitors after 24h

---

## Phase 7 — Lost & Found, Marketplace & Real-Time Notifications (Week 11)

### Goal
Community features + the real-time layer.

### Lost & Found
- POST /lost-found — post with photo (Cloudinary), type (lost/found)
- GET /lost-found — browse all active posts
- PATCH /lost-found/:id/claim — claim a found item
- DELETE /lost-found/:id — admin moderation
- node-cron: auto-archive posts older than 30 days

### Student Marketplace
- POST /marketplace — post item for sale
- GET /marketplace — browse with category filter
- PATCH /marketplace/:id/sold — mark as sold
- node-cron: auto-expire after 60 days

### Real-Time Notifications (Socket.io)
Server-side events to emit:
- complaint_updated → to student
- leave_decided → to student
- notice_posted → to all students (broadcast)
- rent_due → to student (from cron job)
- visitor_arrived → to student

Client-side:
- On app load: connect socket, join personal room by userId
- Bell icon: show unread count
- Toast popup on incoming event

APIs:
- GET /notifications/my — fetch all notifications
- PATCH /notifications/read-all — mark all read

---

## Phase 8 — Analytics, Reports, CI/CD & Deployment (Week 12)

### Goal
Polish everything and make it production-ready.

### Admin Analytics Dashboard (Recharts)
- Monthly revenue bar chart (12 months)
- Payment status donut: Paid / Pending / Overdue
- Complaint category breakdown pie chart
- Occupancy heatmap by floor
- Attendance trends line chart (last 30 days)
- Top complaints by SLA breach

### PDF Reports (pdfkit)
- Monthly financial report: revenue, dues, room-wise breakdown
- Attendance report: student-wise monthly %
- Both downloadable from Admin dashboard

### CI/CD with GitHub Actions
```yaml
# .github/workflows/deploy.yml
on: push to main
jobs:
  test → run npm test
  deploy-backend → SSH to Render / trigger Render deploy hook
  deploy-frontend → trigger Vercel deploy
```

### Deployment
- Frontend → Vercel (free)
- Backend → Render.com (free tier)
- DB → MongoDB Atlas (free M0 cluster)
- Media → Cloudinary (free tier)

### Final Polish
- Swagger/OpenAPI docs for all 50+ endpoints
- Polished README with live demo link + screenshots
- .env.example file
- Seed script with demo data (admin, warden, 5 students, rooms)
- Demo credentials in README for recruiters to test

**Resume line:** *"Deployed full-stack MERN app with GitHub Actions CI/CD, 50+ documented API endpoints, and a seed script for live demo"*

---

## 📊 Final Project Stats

| Metric | Value |
|---|---|
| Total Modules | 14 |
| User Roles | 3 |
| API Endpoints | 50+ |
| DB Collections | 14 |
| Third-party integrations | 5 (Razorpay, Cloudinary, Nodemailer, Socket.io, QR) |
| Scheduled jobs (cron) | 4 |
| PDF generators | 3 (receipt, leave pass, monthly report) |
| Real-time events | 5 |
| Timeline | 12 weeks |

---

## 🏆 What This Demonstrates to Recruiters

| Skill | Evidence in Project |
|---|---|
| Backend Architecture | Controller → Service → Repository, 3-layer separation |
| OOP & SOLID | User inheritance, service-level SOLID principles |
| Auth Engineering | JWT refresh rotation, OTP verification, RBAC |
| Third-party APIs | Razorpay webhooks, Cloudinary, Nodemailer |
| Real-time Systems | Socket.io event-driven notifications |
| PDF Generation | pdfkit receipts, leave passes, reports |
| QR Systems | Attendance tokens, leave pass verification |
| Scheduling | node-cron for reminders and auto-archiving |
| React Best Practices | React Query, React Hook Form, protected routes |
| Data Visualization | Recharts dashboards with multiple chart types |
| CI/CD | GitHub Actions automated deployment |
