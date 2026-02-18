# Sequence Diagram – Rent Payment Flow (UML)

```mermaid
sequenceDiagram
    autonumber

    actor Student
    participant "Frontend (React App)" as FE
    participant "Backend API (Express)" as BE
    participant "MongoDB Database" as DB
    participant "Payment Gateway" as PG

    Student ->> FE: Click "Pay Rent"
    activate FE

    FE ->> BE: POST /api/payments
    activate BE

    BE ->> DB: Fetch rent details
    activate DB
    DB -->> BE: Return rent data
    deactivate DB

    BE ->> PG: Create payment order
    activate PG
    PG -->> BE: Payment success callback
    deactivate PG

    BE ->> DB: Update payment status
    BE -->> FE: Payment confirmation response
    deactivate BE

    FE -->> Student: Display receipt
    deactivate FE
