# Class Diagram – HostelOps Backend Design

## Core Classes

### User (Abstract Class)
- id
- name
- email
- password
- role
+ login()
+ logout()

### Admin extends User
+ manageRoom()
+ generateReport()
+ resolveComplaint()

### Student extends User
+ markAttendance()
+ raiseComplaint()
+ payRent()

### Room
- roomNumber
- capacity
- currentOccupancy
+ assignStudent()
+ removeStudent()

### Payment
- amount
- dueDate
- status
- transactionId
+ processPayment()
+ generateReceipt()

### Complaint
- title
- description
- status
+ updateStatus()

### Attendance
- date
- status
+ mark()

---

## PlantUML Code

@startuml
class User {
  id
  name
  email
  password
  role
  login()
  logout()
}

class Admin
class Student

User <|-- Admin
User <|-- Student

class Room {
  roomNumber
  capacity
  currentOccupancy
}

class Payment {
  amount
  dueDate
  status
}

class Complaint {
  title
  description
  status
}

class Attendance {
  date
  status
}

Student --> Room
Student --> Payment
Student --> Complaint
Student --> Attendance
@enduml
