# 🏨 Hotel Revenue Analytics Dashboard

> **Enterprise Full-Stack Hotel Revenue Management & Financial Intelligence Platform**  
> Engineered by **Mohana Prasath R** for scalable hospitality revenue analytics.

---

## 📑 Table of Contents
1. [Business Problem Statement](#1-business-problem-statement)
2. [Technology Stack](#2-technology-stack)
3. [Architecture & System Design](#3-architecture--system-design)
4. [Prerequisites](#4-prerequisites)
5. [Quick Start & Setup Instructions](#5-quick-start--setup-instructions)
6. [Database Setup & Sample Data Seeder](#6-database-setup--sample-data-seeder)
7. [5-Minute Demonstration Script (Ideas Company Presentation)](#7-5-minute-demonstration-script-ideas-company-presentation)
8. [Automated Testing & Quality Assurance](#8-automated-testing--quality-assurance)
9. [Input Validation & Error Handling](#9-input-validation--error-handling)
10. [REST API Endpoint Catalog](#10-rest-api-endpoint-catalog)
11. [Completed Features & Remaining Limitations Checklist](#11-completed-features--remaining-limitations-checklist)

---

## 1. Business Problem Statement

### The Industry Challenge
Modern hotel revenue managers, asset managers, and property directors face significant friction in maximizing operational yield:
- **Fragmented Data Silos:** Reservation data is typically scattered across disparate Property Management Systems (PMS) and online travel agencies (OTAs).
- **Delayed Financial Visibility:** Month-end financial reconciliations cause a 2-4 week lag in understanding realized revenue vs unearned revenue.
- **Unmeasured Cancellation Impact:** High cancellation rates distort occupancy projections without transparent net-gross revenue adjustments.
- **Manual Spreadsheet Inefficiencies:** Manual computation of **Average Daily Rate (ADR)** and **Revenue Per Available Room (RevPAR)** introduces human error and slows down pricing decisions.

### The Engineered Solution
The **Hotel Revenue Analytics Platform** bridges operational booking workflows with instant financial intelligence:
- Executes **sub-second analytical JPQL aggregations** directly in the relational database engine.
- Excludes cancelled reservations automatically from gross earnings calculations.
- Computes **occupancy percentage rates** and **ADR** in real-time.
- Visualizes time-series monthly revenue trends and property rankings in a responsive executive dashboard.

---

## 2. Technology Stack

| Layer | Technologies Used | Key Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **Angular 19** & **TypeScript 5.7** | Standalone Component Architecture, reactive state, typed services |
| **Frontend Styling** | **Vanilla CSS & Glassmorphism** | Modern dark palette (`#070A10`), Plus Jakarta Sans & JetBrains Mono typography |
| **Data Visualizations** | **Chart.js 4.4** | Time-series line chart with gradient curves & occupancy status donut graphs |
| **Backend Framework** | **Spring Boot 3.2.3** & **Java 22** | Enterprise REST Microservice, Spring Web, Spring Data JPA, Hibernate ORM |
| **Database & Persistence** | **H2 In-Memory** & **MySQL 8.0** | Relational storage, custom JPQL queries, automatic schema migrations |
| **API Contract & Docs** | **OpenAPI 3.0 / Swagger UI** | RFC-7807 global exception handling, interactive API testing sandbox |
| **Automated Testing** | **JUnit 5**, **Mockito**, **MockMvc** | 29 Automated unit/integration tests with 100% passing build |

---

## 3. Architecture & System Design

```
+---------------------------------------------------------------------------------+
|                         Angular 19 Frontend SPA (Port 4200)                     |
|  - Standalone Pages: /dashboard, /bookings, /analytics, /about                  |
|  - Reactive Services: BookingService, AnalyticsService (RxJS Observables)       |
|  - Real-Time Visualizations: Chart.js Line & Donut Visualizers                  |
|  - Node.js SPA Server with Transparent /api/* Reverse Proxy                     |
+----------------------------------------+----------------------------------------+
                                         | HTTP / JSON (CORS Enabled)
                                         v
+---------------------------------------------------------------------------------+
|                       Spring Boot 3.2.3 REST API (Port 8080)                   |
|  - Controllers: BookingController, AnalyticsController                          |
|  - Services: BookingService, AnalyticsService                                  |
|  - Repositories: BookingRepository (Custom Analytical JPQL Aggregations)        |
|  - Validation: Jakarta Validation (@Valid, @DecimalMin, Date Bounds)            |
|  - Exception Handling: GlobalExceptionHandler (RFC-7807 Standard Error DTOs)    |
|  - Development Data Seeder: SampleDataLoader (Idempotent @Profile("!prod"))     |
+----------------------------------------+----------------------------------------+
                                         | JPA / Hibernate ORM
                                         v
+---------------------------------------------------------------------------------+
|                           Relational Database Layer                             |
|  - Development Mode: H2 In-Memory (jdbc:h2:mem:hotel_analytics_db)              |
|  - Production Mode: MySQL 8.0 (Configurable via application.properties)         |
+---------------------------------------------------------------------------------+
```

---

## 4. Prerequisites

Ensure the following runtimes are installed:
- **Java Development Kit (JDK):** Java 17 or higher (Java 22 verified)
- **Apache Maven:** 3.8+ (Maven 3.9.6 verified)
- **Node.js:** 18.0.0+ (Node.js 20.x / 24.x verified)
- **NPM:** 9.0.0+

---

## 5. Quick Start & Setup Instructions

### Step 1: Start the Spring Boot Backend (Port 8080)
```bash
cd hotel-revenue-analytics-api
mvn clean package -DskipTests
java -jar target/hotel-revenue-analytics-api-1.0.0-SNAPSHOT.jar
```
Backend API will be running live at: 👉 **`http://localhost:8080`**  
OpenAPI / Swagger UI sandbox at: 👉 **`http://localhost:8080/swagger-ui/index.html`**

### Step 2: Start the Angular Frontend (Port 4200)
```bash
cd frontend
npm install
npm start
```
Frontend web dashboard will be live at: 👉 **`http://localhost:4200`**

---

## 6. Database Setup & Sample Data Seeder

### Development Mode (Default)
The application includes an **idempotent Sample Data Seeder** ([`SampleDataLoader.java`](file:///c:/MohanaPrasath.in/hotel-revenue-analytics-api/src/main/java/com/mohana/hotelanalytics/config/SampleDataLoader.java)) that seeds **23 realistic, fictional reservations** across 4 properties (*Grand Horizon Resort*, *Starlight Palace Hotel*, *Royal Palm Haven*, *Azure Bay Suites*) on initial startup when the table is empty (`count == 0`).
- **No duplicates** will ever be created on restart.
- No real personal information is used.

### Disabling Sample Data in Production
To run in production without demo data:
1. Set `app.data.seed.enabled=false` in `application.properties`
2. Or run with the `prod` profile:
   ```bash
   java -jar target/hotel-revenue-analytics-api-1.0.0-SNAPSHOT.jar --spring.profiles.active=prod
   ```

---

## 7. 5-Minute Demonstration Script (Ideas Company Presentation)

Follow this structured script when presenting the project to stakeholders or interviewers:

```
[0:00 - 1:00] EXECUTIVE OVERVIEW
- Open http://localhost:4200/dashboard
- Point out the 5 KPI summary cards: Total Revenue ($39,990.00), Total Reservations (23), Occupancy Rate (91.3%), ADR ($1,904.29), Cancellations (2).
- Highlight that cancellations ($1,770.00) are automatically excluded from revenue figures at the database engine tier.

[1:00 - 2:00] CHARTS & LEADERBOARDS
- Hover over the Monthly Revenue Trend line chart to view month-by-month earnings ($1,850 in May -> $7,600 in Dec).
- Hover over the Occupancy Status Donut chart (Checked-Out: 11, Confirmed: 8, Checked-In: 2, Cancelled: 2).
- Review the Top Hotel Properties Leaderboard.

[2:00 - 3:00] DATE-RANGE FILTERING
- Click the "This Month" and "Last 3 Months" filter presets to showcase instant reactive sub-dataset recalculations.

[3:00 - 4:00] RESERVATIONS CRUD & LIVE VALIDATION
- Click 'Bookings' in the top navbar.
- Search for "Vance" or "Presidency" in the search box.
- Click '+ Add New Booking'. Enter Check-out earlier than Check-in to show instant client-side date validation.
- Create a valid booking for "Diana Prince" ($1,250.00). Point out the floating toast notification and automatic table refresh to 24 records.

[4:00 - 5:00] DEEP-DIVE ANALYTICS & SWAGGER EXPLORER
- Switch to 'Analytics' to demonstrate the dynamic Top N Limit Selector (Top 3, Top 5, Top 10).
- Click '⚡ Swagger' in the navbar to open http://localhost:8080/swagger-ui/index.html and execute a live REST request.
```

---

## 8. Automated Testing & Quality Assurance

The application features a complete automated test suite:
- **Backend Tests:** 29 JUnit 5 / Spring Boot Tests covering controllers, services, JPQL repositories, and integration flows.
- **Execution Command:**
  ```bash
  cd hotel-revenue-analytics-api
  mvn test
  ```
  **Results:** `Tests run: 29, Failures: 0, Errors: 0, Skipped: 0` (100% passing).
- **Integration Test Script:** An automated end-to-end PowerShell script ([`run_integration_tests.ps1`](file:///C:/Users/mohan/.gemini/antigravity-ide/brain/25769695-4375-48cd-8b43-91df00589844/scratch/run_integration_tests.ps1)) testing CORS preflight, analytical calculations, full CRUD cycles, 400 validation rejections, 404 lookups, and SPA routing.

---

## 9. Input Validation & Error Handling

- **Date Range Constraint:** Strict validation ensuring `checkOutDate > checkInDate` on both Angular forms and Spring Boot controllers.
- **Bean Validation:** `@NotBlank`, `@NotNull`, `@Min(1)`, and `@DecimalMin("0.01")` annotations on all incoming DTOs.
- **RFC-7807 Error Responses:** Standardized JSON error payload with timestamp, HTTP status, error message, and validation field mappings.
- **Frontend Resilience:** Animated loading spinners, graceful empty-state placeholder cards, floating toast alerts, and connection offline banners with retry triggers.

---

## 10. REST API Endpoint Catalog

| HTTP Method | API Path | Responsibility | Status Codes |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/bookings` | Create new hotel reservation | `201 Created`, `400 Bad Request` |
| `GET` | `/api/bookings` | List all reservations | `200 OK` |
| `GET` | `/api/bookings/{id}` | Get single reservation by ID | `200 OK`, `404 Not Found` |
| `PUT` | `/api/bookings/{id}` | Update existing reservation | `200 OK`, `400 Bad Request`, `404 Not Found` |
| `DELETE` | `/api/bookings/{id}` | Delete reservation record | `204 No Content`, `404 Not Found` |
| `GET` | `/api/bookings/hotel/{hotelName}` | Filter bookings by hotel name | `200 OK` |
| `GET` | `/api/analytics/total-revenue` | Cumulative realized revenue (excluding cancelled) | `200 OK` |
| `GET` | `/api/analytics/revenue-by-hotel` | Revenue breakdown by hotel property | `200 OK` |
| `GET` | `/api/analytics/revenue-by-month` | Time-series monthly revenue trends (`YYYY-MM`) | `200 OK` |
| `GET` | `/api/analytics/booking-count-by-status` | Operational booking status counts | `200 OK` |
| `GET` | `/api/analytics/average-revenue` | Mean revenue yield per active booking | `200 OK` |
| `GET` | `/api/analytics/top-hotels?limit=5` | Ranked top $N$ hotel properties | `200 OK` |

---

## 11. Completed Features & Remaining Limitations Checklist

### ✅ Completed & Fully Verified Features
- [x] Full-Stack decoupled microservice architecture (Angular 19 + Spring Boot 3 + Java 22)
- [x] Executive Dashboard with 5 core KPI summary cards
- [x] Interactive Chart.js Monthly Revenue Yield Trend and Status Donut charts
- [x] Full CRUD Reservations Manager with real-time search, multi-filters, and date filtering
- [x] Add/Edit Modal Form with stay night duration preview and strict validation
- [x] Delete confirmation modal dialog with zero accidental data loss
- [x] Floating Toast notification system for instant user feedback
- [x] Safe development-only Sample Data Loader with 23 realistic fictional records
- [x] Idempotency guard (`count == 0`) preventing duplicate inserts on restart
- [x] Global CORS configuration with credentials and reverse proxy support
- [x] 29 passing JUnit 5 / Spring Boot automated tests
- [x] OpenAPI 3.0 / Swagger UI documentation integration

### ⏳ Remaining Limitations & Roadmap Enhancements
- [ ] **Role-Based Access Control (RBAC):** Authentication & authorization via Spring Security with OAuth2 / JWT tokens for Manager vs Receptionist roles.
- [ ] **Dynamic Room Inventory Allocation:** Tracking physical room numbers with automated overbooking locks.
- [ ] **Export Engine:** One-click CSV and PDF report generation for executive accounting audits.
- [ ] **PMS Integration Webhooks:** Real-time bi-directional synchronization with external systems (e.g. Opera, Cloudbeds, Amadeus).

---

## 👤 Author & Maintainer
- **Engineer:** Mohana Prasath R
- **Portfolio:** [mohanaprasath.in](https://mohanaprasath.in)
- **GitHub:** [@MohanaPrasathR](https://github.com/MohanaPrasathR)
- **LinkedIn:** [Mohana Prasath R](https://www.linkedin.com/in/mohana-prasath-r-6268b132a/)
