package com.mohana.hotelanalytics.config;

import com.mohana.hotelanalytics.entity.Booking;
import com.mohana.hotelanalytics.entity.BookingStatus;
import com.mohana.hotelanalytics.entity.RoomType;
import com.mohana.hotelanalytics.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Development-Only Sample Data Seeder.
 * 
 * Safely inserts rich, realistic fictional reservations for demonstration.
 * - Idempotent: Only inserts if database table is completely empty (count == 0).
 * - Development-Only: Disabled in production profile (!prod) or when app.data.seed.enabled=false.
 * - Privacy-Safe: Contains fictional guest names and simulated revenue figures.
 */
@Component
@Profile("!prod")
@ConditionalOnProperty(name = "app.data.seed.enabled", havingValue = "true", matchIfMissing = true)
@RequiredArgsConstructor
@Slf4j
public class SampleDataLoader implements CommandLineRunner {

    private final BookingRepository bookingRepository;

    @Override
    public void run(String... args) {
        long currentCount = bookingRepository.count();
        if (currentCount > 0) {
            log.info("[SAMPLE DATA LOADER] Database already contains {} booking records. Skipping sample data seed.", currentCount);
            return;
        }

        log.info("[SAMPLE DATA LOADER] Seeding safe development-only hotel reservations for dashboard demonstration...");

        List<Booking> sampleBookings = List.of(
            // Grand Horizon Resort
            createBooking("Grand Horizon Resort", "Eleanor Vance", "2026-05-10", "2026-05-15", 2, RoomType.DELUXE, BookingStatus.CHECKED_OUT, 1250.00),
            createBooking("Grand Horizon Resort", "Liam Sterling", "2026-06-01", "2026-06-07", 3, RoomType.SUITE, BookingStatus.CHECKED_OUT, 1800.00),
            createBooking("Grand Horizon Resort", "Sophia Montgomery", "2026-07-12", "2026-07-16", 2, RoomType.DELUXE, BookingStatus.CHECKED_OUT, 1200.00),
            createBooking("Grand Horizon Resort", "Lucas Blackwood", "2026-08-05", "2026-08-10", 4, RoomType.PRESIDENTIAL, BookingStatus.CHECKED_IN, 3200.00),
            createBooking("Grand Horizon Resort", "Clara Kensington", "2026-09-18", "2026-09-22", 1, RoomType.SINGLE, BookingStatus.CONFIRMED, 680.00),
            createBooking("Grand Horizon Resort", "Noah Gallagher", "2026-10-02", "2026-10-06", 2, RoomType.DOUBLE, BookingStatus.CANCELLED, 850.00),

            // Starlight Palace Hotel
            createBooking("Starlight Palace Hotel", "Isabella Fairchild", "2026-05-18", "2026-05-20", 1, RoomType.SINGLE, BookingStatus.CHECKED_OUT, 600.00),
            createBooking("Starlight Palace Hotel", "Ethan Caldwell", "2026-06-15", "2026-06-20", 2, RoomType.DELUXE, BookingStatus.CHECKED_OUT, 1500.00),
            createBooking("Starlight Palace Hotel", "Amelia Thornton", "2026-07-01", "2026-07-08", 4, RoomType.PRESIDENTIAL, BookingStatus.CHECKED_OUT, 5900.00),
            createBooking("Starlight Palace Hotel", "Julian Mercer", "2026-08-14", "2026-08-18", 2, RoomType.SUITE, BookingStatus.CONFIRMED, 2050.00),
            createBooking("Starlight Palace Hotel", "Charlotte Hayes", "2026-09-05", "2026-09-10", 2, RoomType.DELUXE, BookingStatus.CONFIRMED, 1600.00),
            createBooking("Starlight Palace Hotel", "Sebastian Cross", "2026-11-20", "2026-11-25", 3, RoomType.SUITE, BookingStatus.CONFIRMED, 2450.00),

            // Royal Palm Haven
            createBooking("Royal Palm Haven", "Harper Bennett", "2026-06-22", "2026-06-25", 2, RoomType.DOUBLE, BookingStatus.CHECKED_OUT, 950.00),
            createBooking("Royal Palm Haven", "Oliver Hawthorne", "2026-08-20", "2026-08-25", 3, RoomType.SUITE, BookingStatus.CHECKED_OUT, 2200.00),
            createBooking("Royal Palm Haven", "Evelyn Sinclair", "2026-09-12", "2026-09-16", 2, RoomType.DELUXE, BookingStatus.CONFIRMED, 1450.00),
            createBooking("Royal Palm Haven", "Theodore Brooks", "2026-10-15", "2026-10-18", 1, RoomType.SINGLE, BookingStatus.CONFIRMED, 720.00),
            createBooking("Royal Palm Haven", "Aurora Davenport", "2026-11-05", "2026-11-08", 2, RoomType.DOUBLE, BookingStatus.CANCELLED, 920.00),

            // Azure Bay Suites
            createBooking("Azure Bay Suites", "Gabriel Sterling", "2026-05-02", "2026-05-06", 2, RoomType.DOUBLE, BookingStatus.CHECKED_OUT, 890.00),
            createBooking("Azure Bay Suites", "Hannah Winslow", "2026-07-20", "2026-07-24", 2, RoomType.DELUXE, BookingStatus.CHECKED_OUT, 1350.00),
            createBooking("Azure Bay Suites", "Dominic Foster", "2026-08-10", "2026-08-15", 3, RoomType.SUITE, BookingStatus.CHECKED_IN, 1980.00),
            createBooking("Azure Bay Suites", "Victoria Rhodes", "2026-09-25", "2026-09-30", 2, RoomType.PRESIDENTIAL, BookingStatus.CONFIRMED, 3400.00),
            createBooking("Azure Bay Suites", "Maxwell Archer", "2026-10-10", "2026-10-14", 1, RoomType.SINGLE, BookingStatus.CONFIRMED, 620.00),
            createBooking("Azure Bay Suites", "Genevieve Locke", "2026-12-22", "2026-12-28", 4, RoomType.PRESIDENTIAL, BookingStatus.CONFIRMED, 4200.00)
        );

        bookingRepository.saveAll(sampleBookings);
        log.info("[SAMPLE DATA LOADER] Successfully seeded {} development sample hotel reservations.", sampleBookings.size());
    }

    private Booking createBooking(String hotelName, String guestName, String checkIn, String checkOut, int guests, RoomType roomType, BookingStatus status, double revenue) {
        return Booking.builder()
                .hotelName(hotelName)
                .guestName(guestName)
                .checkInDate(LocalDate.parse(checkIn))
                .checkOutDate(LocalDate.parse(checkOut))
                .guests(guests)
                .roomType(roomType)
                .bookingStatus(status)
                .totalRevenue(BigDecimal.valueOf(revenue))
                .createdAt(LocalDateTime.now().minusDays((long) (Math.random() * 30)))
                .build();
    }
}
