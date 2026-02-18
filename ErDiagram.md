# ER Diagram – HostelOps Database Design

```mermaid
erDiagram

    USERS {
        ObjectId _id PK
        string name
        string email
        string password
        string role
        date createdAt
        date updatedAt
    }

    ROOMS {
        ObjectId _id PK
        string roomNumber
        int capacity
        int currentOccupancy
        date createdAt
        date updatedAt
    }

    PAYMENTS {
        ObjectId _id PK
        ObjectId studentId FK
        float amount
        date dueDate
        string status
        string transactionId
        date createdAt
    }

    COMPLAINTS {
        ObjectId _id PK
        ObjectId studentId FK
        string title
        string description
        string status
        date createdAt
        date updatedAt
    }

    ATTENDANCE {
        ObjectId _id PK
        ObjectId studentId FK
        date date
        string status
        date createdAt
    }

    USERS ||--o{ PAYMENTS : makes
    USERS ||--o{ COMPLAINTS : raises
    USERS ||--o{ ATTENDANCE : marks
    ROOMS ||--o{ USERS : contains
