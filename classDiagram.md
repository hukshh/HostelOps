# Class Diagram – HostelOps Backend Design

```mermaid
classDiagram

    class User {
        +ObjectId _id
        +String name
        +String email
        +String password
        +String role
        +login()
        +logout()
    }

    class Admin {
        +manageRoom()
        +generateReport()
        +resolveComplaint()
    }

    class Student {
        +markAttendance()
        +raiseComplaint()
        +payRent()
    }

    class Room {
        +ObjectId _id
        +String roomNumber
        +int capacity
        +int currentOccupancy
        +assignStudent()
        +removeStudent()
    }

    class Payment {
        +ObjectId _id
        +float amount
        +Date dueDate
        +String status
        +String transactionId
        +processPayment()
        +generateReceipt()
    }

    class Complaint {
        +ObjectId _id
        +String title
        +String description
        +String status
        +updateStatus()
    }

    class Attendance {
        +ObjectId _id
        +Date date
        +String status
        +mark()
    }

    User <|-- Admin
    User <|-- Student
    Student --> Room
    Student --> Payment
    Student --> Complaint
    Student --> Attendance
