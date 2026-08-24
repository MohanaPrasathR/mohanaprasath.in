package com.mohana.hotelanalytics.repository;

import com.mohana.hotelanalytics.entity.Booking;
import com.mohana.hotelanalytics.entity.BookingStatus;
import com.mohana.hotelanalytics.entity.RoomType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.TestPropertySource;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@TestPropertySource(properties = {
    "spring.jpa.defer-datasource-initialization=true",
    "spring.sql.init.mode=always"
})
class BookingRepositoryTest {

    @Autowired
    private BookingRepository bookingRepository;

    @BeforeEach
    void setUp() {
        // Clean database state for isolated repository testing if needed
    }

    @Test
    @DisplayName("Should find bookings by hotel name ignoring case")
    void findByHotelNameIgnoreCase_Success() {
        List<Booking> grandHorizonBookings = bookingRepository.findByHotelNameIgnoreCase("grand horizon resort");

        assertThat(grandHorizonBookings).isNotEmpty();
        assertThat(grandHorizonBookings.get(0).getHotelName()).isEqualTo("Grand Horizon Resort");
    }

    @Test
    @DisplayName("Should calculate total revenue of active bookings accurately")
    void findTotalRevenueOfActiveBookings_Success() {
        BigDecimal totalRevenue = bookingRepository.findTotalRevenueOfActiveBookings();

        assertThat(totalRevenue).isNotNull();
        assertThat(totalRevenue).isGreaterThan(BigDecimal.ZERO);
    }

    @Test
    @DisplayName("Should retrieve top hotels ordered by cumulative revenue")
    void findTopHotelsByRevenue_Success() {
        List<Object[]> topHotels = bookingRepository.findTopHotelsByRevenue(PageRequest.of(0, 3));

        assertThat(topHotels).isNotEmpty();
        assertThat(topHotels.size()).isLessThanOrEqualTo(3);
        assertThat(topHotels.get(0)[0]).isNotNull(); // Hotel Name
        assertThat(topHotels.get(0)[1]).isNotNull(); // Cumulative Revenue
    }

    @Test
    @DisplayName("Should group booking counts by BookingStatus enum")
    void findBookingCountGroupedByStatus_Success() {
        List<Object[]> statusCounts = bookingRepository.findBookingCountGroupedByStatus();

        assertThat(statusCounts).isNotEmpty();
    }
}
