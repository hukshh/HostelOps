# Use Case Diagram – HostelOps (UML)

```mermaid
flowchart TB

    %% Actors
    Admin["<<Actor>> Admin"]
    Student["<<Actor>> Student"]

    %% System Boundary
    subgraph HostelOps System

        UC1(("Login"))
        UC2(("Register"))
        UC3(("Manage Rooms"))
        UC4(("Assign Student to Room"))
        UC5(("Track Rent Payments"))
        UC6(("Generate Monthly Reports"))
        UC7(("View Dashboard"))
        UC8(("Manage Complaints"))
        UC9(("Approve Attendance"))

        UC10(("View Room Details"))
        UC11(("Mark Attendance"))
        UC12(("Pay Rent"))
        UC13(("View Payment History"))
        UC14(("Raise Complaint"))
        UC15(("Track Complaint Status"))

    end

    %% Admin Associations
    Admin --> UC1
    Admin --> UC3
    Admin --> UC4
    Admin --> UC5
    Admin --> UC6
    Admin --> UC7
    Admin --> UC8
    Admin --> UC9

    %% Student Associations
    Student --> UC2
    Student --> UC1
    Student --> UC10
    Student --> UC11
    Student --> UC12
    Student --> UC13
    Student --> UC14
    Student --> UC15
