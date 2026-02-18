# Use Case Diagram – HostelOps

## Actors
1. Admin
2. Student

---

## Admin Use Cases
- Login
- Manage Rooms
- Assign Student to Room
- Track Rent Payments
- View Dashboard Analytics
- Generate Monthly Reports
- Manage Complaints
- Approve Attendance

---

## Student Use Cases
- Register
- Login
- View Room Details
- Mark Attendance
- Pay Rent
- View Payment History
- Raise Complaint
- Track Complaint Status

---

## PlantUML Code

@startuml
actor Admin
actor Student

Admin --> (Login)
Admin --> (Manage Rooms)
Admin --> (Assign Room)
Admin --> (Track Rent)
Admin --> (View Dashboard)
Admin --> (Generate Reports)
Admin --> (Manage Complaints)
Admin --> (Approve Attendance)

Student --> (Register)
Student --> (Login)
Student --> (View Room Details)
Student --> (Mark Attendance)
Student --> (Pay Rent)
Student --> (View Payment History)
Student --> (Raise Complaint)
Student --> (Track Complaint Status)
@enduml
