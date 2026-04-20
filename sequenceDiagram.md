# Sequence Diagrams – HostelOps v2.0

---

## 1. Rent Payment Flow (Razorpay + Webhook)

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant FE as Frontend (React)
    participant BE as Backend (Express)
    participant DB as MongoDB
    participant RZ as Razorpay

    Student ->> FE: Click "Pay Rent"
    FE ->> BE: POST /api/payments/create-order
    BE ->> DB: Fetch pending rent for student
    DB -->> BE: Rent amount + due date
    BE ->> RZ: Create Razorpay order
    RZ -->> BE: { orderId, amount, currency }
    BE -->> FE: Order details
    FE ->> RZ: Open Razorpay checkout modal
    Student ->> RZ: Completes payment
    RZ -->> FE: Payment success callback
    FE ->> BE: POST /api/payments/verify { paymentId, orderId, signature }
    BE ->> BE: Verify Razorpay signature (HMAC)
    BE ->> DB: Update payment status to "Paid"
    BE ->> BE: Generate PDF receipt (pdfkit)
    BE ->> Student: Send receipt via email (Nodemailer)
    BE -->> FE: { success, receiptUrl }
    FE -->> Student: Show success + download receipt
```

---

## 2. Leave Application → QR Leave Pass Flow

```mermaid
sequenceDiagram
    autonumber
    actor Student
    actor Warden
    participant FE as Frontend
    participant BE as Backend
    participant DB as MongoDB

    Student ->> FE: Fill leave form (dates, reason, destination)
    FE ->> BE: POST /api/leaves
    BE ->> DB: Create leave record { status: "Pending" }
    BE ->> Warden: Socket.io event: "new_leave_request"
    DB -->> BE: Leave saved
    BE -->> FE: Leave submitted successfully

    Warden ->> FE: View pending leave requests
    FE ->> BE: GET /api/leaves?status=pending
    BE ->> DB: Fetch pending leaves
    DB -->> BE: Leave list
    BE -->> FE: Render leave requests

    Warden ->> FE: Click "Approve" + add remark
    FE ->> BE: PATCH /api/leaves/:id/review
    BE ->> DB: Update status to "Approved"
    BE ->> BE: Generate QR Code (leaveId + studentId + dates)
    BE ->> BE: Generate Leave Pass PDF with QR (pdfkit)
    BE ->> DB: Save leavePassUrl
    BE ->> Student: Socket.io event: "leave_approved"
    BE ->> Student: Email with leave pass PDF
    BE -->> FE: Success

    Student ->> FE: View approved leave
    FE ->> BE: GET /api/leaves/:id/pass
    BE -->> FE: Redirect to PDF URL
    FE -->> Student: Download QR-coded leave pass
```

---

## 3. QR Attendance Flow (Daily Rotating Token)

```mermaid
sequenceDiagram
    autonumber
    actor Warden
    actor Student
    participant FE as Frontend
    participant BE as Backend
    participant DB as MongoDB

    Warden ->> FE: Click "Generate Today's QR"
    FE ->> BE: POST /api/attendance/generate-qr
    BE ->> BE: Create token: { date, secret } signed with JWT (expires midnight)
    BE -->> FE: QR code image (base64)
    FE -->> Warden: Display QR on screen / projector

    Student ->> FE: Scan QR code with phone
    FE ->> BE: POST /api/attendance/checkin { token }
    BE ->> BE: Verify token signature + check date == today
    BE ->> DB: Check if already marked today
    DB -->> BE: Not marked yet
    BE ->> DB: Create attendance record { status: "Present" }
    BE -->> FE: Attendance marked successfully
    FE -->> Student: "✅ Attendance marked for today"
```

---

## 4. Real-Time Notification Flow (Socket.io)

```mermaid
sequenceDiagram
    autonumber
    actor Admin
    actor Student
    participant FE_A as Admin Frontend
    participant FE_S as Student Frontend
    participant BE as Backend (Express + Socket.io)
    participant DB as MongoDB

    Student ->> FE_S: Open app → connect Socket
    FE_S ->> BE: socket.emit("join", { userId })
    BE ->> BE: socket.join(userId room)

    Admin ->> FE_A: Update complaint status to "Resolved"
    FE_A ->> BE: PATCH /api/complaints/:id
    BE ->> DB: Update complaint status
    BE ->> DB: Create notification record for student
    BE ->> FE_S: socket.to(studentId).emit("notification", { type, message })
    FE_S -->> Student: Bell icon updates count + toast alert
```
