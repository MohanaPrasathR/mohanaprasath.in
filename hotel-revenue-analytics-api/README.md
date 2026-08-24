# 🏨 Hotel Revenue Analytics — Spring Boot REST Microservice

A high-performance Spring Boot 3 / Java 22 REST API providing reservation management and financial revenue analytics.

---

## 🚀 Quick Start & Execution

```bash
# Build project
mvn clean package -DskipTests

# Run application JAR
java -jar target/hotel-revenue-analytics-api-1.0.0-SNAPSHOT.jar
```

- **API Base URL:** `http://localhost:8080/api`
- **Swagger Documentation:** `http://localhost:8080/swagger-ui/index.html`
- **H2 Web Console:** `http://localhost:8080/h2-console` (`jdbc:h2:mem:hotel_analytics_db`)
- **Frontend Dashboard:** `http://localhost:4200` (from `../frontend/`)

---

## 📡 REST API Catalog

| Method | Path | Description | Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/bookings` | Create a booking | `201 Created` |
| `GET` | `/api/bookings` | Retrieve all bookings | `200 OK` |
| `GET` | `/api/bookings/{id}` | Find booking by ID | `200 OK / 404` |
| `PUT` | `/api/bookings/{id}` | Update booking | `200 OK / 400` |
| `DELETE` | `/api/bookings/{id}` | Delete booking | `204 No Content` |
| `GET` | `/api/bookings/hotel/{hotelName}` | Find bookings by hotel name | `200 OK` |
| `GET` | `/api/analytics/total-revenue` | Cumulative revenue | `200 OK` |
| `GET` | `/api/analytics/revenue-by-hotel` | Revenue grouped by hotel | `200 OK` |
| `GET` | `/api/analytics/revenue-by-month` | Monthly revenue trends | `200 OK` |
| `GET` | `/api/analytics/booking-count-by-status` | Status count breakdown | `200 OK` |
| `GET` | `/api/analytics/average-revenue` | Average revenue per booking | `200 OK` |
| `GET` | `/api/analytics/top-hotels?limit=5` | Top N ranked hotels | `200 OK` |

---

## 🗄️ Database Configuration

### H2 In-Memory (Default)
Seeded with 23 development sample reservations via `SampleDataLoader.java` on empty database startup (`count == 0`).

### Disabling Sample Data in Production
- Set `app.data.seed.enabled=false` in `application.properties`
- Or pass environment variable: `APP_SEED_ENABLED=false`
- Or run with active production profile: `--spring.profiles.active=prod`

### MySQL 8.0 (Production)
Configurable in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hotel_analytics_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
```
