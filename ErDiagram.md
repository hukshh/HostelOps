# ER Diagram – Database Design

## Collections

### Users
- _id
- name
- email
- password
- role (admin/student)

### Rooms
- _id
- roomNumber
- capacity
- currentOccupancy

### Payments
- _id
- studentId (ref Users)
- amount
- dueDate
- status
- transactionId

### Complaints
- _id
- studentId (ref Users)
- title
- description
- status
- createdAt

### Attendance
- _id
- studentId (ref Users)
- date
- status

---

## Relationships

- One User (Student) can have many Payments.
- One User (Student) can have many Complaints.
- One User (Student) can have many Attendance records.
- One Room can have multiple Students.
- Each Payment belongs to one Student.

---

## PlantUML ER Code

@startuml
entity Users
entity Rooms
entity Payments
entity Complaints
entity Attendance

Users ||--o{ Payments
Users ||--o{ Complaints
Users ||--o{ Attendance
Rooms ||--o{ Users
@enduml
