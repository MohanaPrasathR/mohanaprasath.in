# Hotel Revenue Analytics — Angular Frontend

A modern, responsive, high-performance **Angular 19 & TypeScript** web application providing an executive dashboard, reservations management (CRUD), deep-dive revenue/occupancy analytics, and API documentation for the **Hotel Revenue Analytics Spring Boot** backend.

---

## 🚀 Getting Started & Execution Commands

### Prerequisites
- **Node.js**: v18.0.0 or higher (v24.x tested & verified)
- **NPM**: v9.0.0 or higher
- **Spring Boot Backend**: Running on `http://localhost:8080`

### 1. Install Dependencies
Run the following command inside the `frontend` directory:
```bash
npm install
```

### 2. Launch Local Development Server
```bash
npm start
```
*Or using Angular CLI directly:*
```bash
npx ng serve --port 4200
```

Once started, open your browser and navigate to:
👉 **`http://localhost:4200`**

### 3. Production Build
To compile and generate an optimized production bundle:
```bash
npm run build
```
The compiled assets will be output to `dist/hotel-revenue-frontend/`.

---

## ⚙️ Environment Configuration

API endpoints are configured in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api', // Spring Boot REST API base URL
  appName: 'Hotel Revenue Analytics'
};
```

---

## 📱 Page Routes & Features

| Route | Section | Description |
| :--- | :--- | :--- |
| `/dashboard` | **Executive Dashboard** | Summary KPI cards (Revenue, Bookings, Occupancy Rate, ADR, Cancellations), Date-Range Filtering, Monthly Yield Trend line chart, Status donut chart, Property leaderboard, and Recent reservations. |
| `/bookings` | **Reservations Manager** | Full CRUD interface (Create, Read, Update, Delete), Search by guest/hotel/#ID, Filter by Status, Room Type, and Date Range. Real-time validation modal. |
| `/analytics` | **Deep-Dive Analytics** | Top N ranked hotels with dynamic limit selector (Top 3, 5, 10), Property comparison bar chart, Monthly time-series chart, and historical metrics table. |
| `/about` | **Architecture & API Specs** | Technical architecture breakdown, tech stack badges, and interactive REST API endpoint catalog linking to Swagger UI. |

---

## 🧩 Architectural Highlights
- **Standalone Angular Components**: Modular, tree-shakeable architecture without legacy NgModule boilerplate.
- **Typed RxJS HTTP Services**: `BookingService` and `AnalyticsService` mapping directly to Spring Boot backend DTO contracts.
- **Interactive Chart.js Integration**: Dynamic time-series line charts, occupancy donuts, and property revenue bar graphs.
- **Error Handling & State Resilience**: Graceful error banners with retry triggers, loading skeletons, and empty state cards.
