# Sequence Diagram – Rent Payment Flow

## Main End-to-End Flow: Student Pays Rent

Actors:
Student → Frontend → Backend → Database → Payment Gateway

---

## Flow Description

1. Student logs into the system.
2. Student selects "Pay Rent".
3. Frontend sends payment request to backend API.
4. Backend verifies rent due from database.
5. Backend initiates payment gateway request.
6. Payment gateway processes transaction.
7. Success callback received by backend.
8. Backend updates payment status in database.
9. Receipt is generated.
10. Confirmation response sent to frontend.

---

## PlantUML Code

@startuml
actor Student
participant Frontend
participant Backend
database Database
participant PaymentGateway

Student -> Frontend : Click Pay Rent
Frontend -> Backend : POST /api/payments
Backend -> Database : Verify Rent Due
Backend -> PaymentGateway : Create Payment Request
PaymentGateway -> Backend : Payment Success
Backend -> Database : Update Payment Status
Backend -> Frontend : Send Confirmation
Frontend -> Student : Show Receipt
@enduml
