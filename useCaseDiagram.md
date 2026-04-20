# Use Case Diagram – HostelOps v2.0

```mermaid
flowchart TB

    Admin["👨‍💼 Admin"]
    Warden["👮 Warden"]
    Student["🎓 Student"]

    subgraph Auth ["🔐 Authentication"]
        A1(("Login"))
        A2(("Register + OTP Verify"))
        A3(("Reset Password"))
        A4(("Logout All Devices"))
    end

    subgraph Rooms ["🏠 Room Management"]
        R1(("CRUD Rooms"))
        R2(("Assign Student to Room"))
        R3(("View Room Grid"))
        R4(("View Own Room"))
    end

    subgraph Payments ["💳 Payments"]
        P1(("Track Rent Dues"))
        P2(("Pay Rent Online"))
        P3(("View Payment History"))
        P4(("Download PDF Receipt"))
        P5(("Generate Financial Report")))
    end

    subgraph Complaints ["🛠️ Complaints"])
        C1(("Raise Complaint + Photo"))
        C2(("Track Complaint Status"))
        C3(("Assign Complaint"))
        C4(("Respond & Resolve"))
        C5(("View SLA Analytics"))
    end

    subgraph Attendance ["📋 Attendance"]
        AT1(("Mark Daily Attendance"))
        AT2(("QR Self Check-In"))
        AT3(("View Attendance Stats"))
        AT4(("Generate Daily QR"))
    end

    subgraph Leave ["🚪 Leave Management"]
        L1(("Apply for Leave"))
        L2(("Approve / Reject Leave"))
        L3(("Download QR Leave Pass"))
        L4(("View Leave History"))
    end

    subgraph Mess ["🍛 Mess Management"]
        M1(("Publish Weekly Menu"))
        M2(("View Mess Menu"))
        M3(("Rate Meals"))
        M4(("Opt Out of Meal"))
        M5(("View Meal Analytics"))
    end

    subgraph Notices ["📢 Notice Board"]
        N1(("Post Notice"))
        N2(("View Notices"))
        N3(("Acknowledge Notice"))
    end

    subgraph Visitors ["👥 Visitor Management"]
        V1(("Pre-Register Visitor"))
        V2(("Log Entry / Exit"))
        V3(("View Visitor Log"))
    end

    subgraph LostFound ["🔍 Lost & Found"]
        LF1(("Post Lost/Found Item"))
        LF2(("Claim Item"))
        LF3(("Moderate Posts"))
    end

    subgraph Market ["🛒 Marketplace"]
        MK1(("Post Item for Sale"))
        MK2(("Browse Listings"))
        MK3(("Contact Seller"))
    end

    subgraph Notifications ["🔔 Notifications"]
        NT1(("Receive Real-Time Alerts"))
        NT2(("Mark Notifications Read"))
    end

    Admin --> A1 & A3 & A4
    Admin --> R1 & R2 & R3
    Admin --> P1 & P5
    Admin --> C3 & C4 & C5
    Admin --> AT3 & AT4
    Admin --> L2
    Admin --> M1 & M5
    Admin --> N1 & N2
    Admin --> V3
    Admin --> LF3
    Admin --> NT1 & NT2

    Warden --> A1 & A3
    Warden --> R3 & R4
    Warden --> C3 & C4
    Warden --> AT1 & AT3 & AT4
    Warden --> L2 & L4
    Warden --> M2
    Warden --> N1 & N2
    Warden --> V2 & V3
    Warden --> NT1 & NT2

    Student --> A1 & A2 & A3 & A4
    Student --> R4
    Student --> P2 & P3 & P4
    Student --> C1 & C2
    Student --> AT2 & AT3
    Student --> L1 & L3 & L4
    Student --> M2 & M3 & M4
    Student --> N2 & N3
    Student --> V1
    Student --> LF1 & LF2
    Student --> MK1 & MK2 & MK3
    Student --> NT1 & NT2
```
