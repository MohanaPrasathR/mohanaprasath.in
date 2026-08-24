package com.mohana.hotelanalytics.service;

import com.mohana.hotelanalytics.dto.response.*;
import com.mohana.hotelanalytics.entity.BookingStatus;
import com.mohana.hotelanalytics.repository.BookingRepository;
import com.mohana.hotelanalytics.service.impl.AnalyticsServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AnalyticsServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @InjectMocks
    private AnalyticsServiceImpl analyticsService;

    @Test
    @DisplayName("Should return total revenue and active booking count")
    void getTotalRevenue_Success() {
        when(bookingRepository.findTotalRevenueOfActiveBookings()).thenReturn(new BigDecimal("5000.00"));
        when(bookingRepository.countActiveBookings()).thenReturn(10L);

        TotalRevenueResponse response = analyticsService.getTotalRevenue();

        assertThat(response).isNotNull();
        assertThat(response.getTotalRevenue()).isEqualTo(new BigDecimal("5000.00"));
        assertThat(response.getEligibleBookingsCount()).isEqualTo(10L);
    }

    @Test
    @DisplayName("Should return revenue breakdown grouped by hotel")
    void getRevenueByHotel_Success() {
        Object[] hotelRow = new Object[]{"Grand Hyatt", new BigDecimal("3000.00"), 5L};
        List<Object[]> rows = Collections.singletonList(hotelRow);
        when(bookingRepository.findRevenueGroupedByHotel()).thenReturn(rows);

        List<HotelRevenueResponse> response = analyticsService.getRevenueByHotel();

        assertThat(response).hasSize(1);
        assertThat(response.get(0).getHotelName()).isEqualTo("Grand Hyatt");
        assertThat(response.get(0).getTotalRevenue()).isEqualTo(new BigDecimal("3000.00"));
        assertThat(response.get(0).getBookingCount()).isEqualTo(5L);
    }

    @Test
    @DisplayName("Should return monthly revenue trends")
    void getRevenueByMonth_Success() {
        Object[] monthRow = new Object[]{"2026-09", new BigDecimal("2500.00"), 4L};
        List<Object[]> rows = Collections.singletonList(monthRow);
        when(bookingRepository.findMonthlyRevenueTrend()).thenReturn(rows);

        List<MonthlyRevenueResponse> response = analyticsService.getRevenueByMonth();

        assertThat(response).hasSize(1);
        assertThat(response.get(0).getYearMonth()).isEqualTo("2026-09");
        assertThat(response.get(0).getTotalRevenue()).isEqualTo(new BigDecimal("2500.00"));
    }

    @Test
    @DisplayName("Should return booking count grouped by status")
    void getBookingCountByStatus_Success() {
        Object[] statusRow = new Object[]{BookingStatus.CONFIRMED, 8L};
        List<Object[]> rows = Collections.singletonList(statusRow);
        when(bookingRepository.findBookingCountGroupedByStatus()).thenReturn(rows);

        List<StatusCountResponse> response = analyticsService.getBookingCountByStatus();

        assertThat(response).hasSize(1);
        assertThat(response.get(0).getBookingStatus()).isEqualTo(BookingStatus.CONFIRMED);
        assertThat(response.get(0).getCount()).isEqualTo(8L);
    }

    @Test
    @DisplayName("Should return average revenue per booking")
    void getAverageRevenue_Success() {
        when(bookingRepository.findAverageRevenuePerBooking()).thenReturn(450.75);
        when(bookingRepository.countActiveBookings()).thenReturn(8L);

        AverageRevenueResponse response = analyticsService.getAverageRevenue();

        assertThat(response).isNotNull();
        assertThat(response.getAverageRevenuePerBooking()).isEqualTo(new BigDecimal("450.75"));
        assertThat(response.getTotalBookingsEvaluated()).isEqualTo(8L);
    }

    @Test
    @DisplayName("Should return top hotels by revenue limit")
    void getTopHotels_Success() {
        Object[] topHotelRow = new Object[]{"Ritz Carlton", new BigDecimal("4500.00"), 6L};
        List<Object[]> rows = Collections.singletonList(topHotelRow);
        when(bookingRepository.findTopHotelsByRevenue(PageRequest.of(0, 3))).thenReturn(rows);

        List<TopHotelResponse> response = analyticsService.getTopHotels(3);

        assertThat(response).hasSize(1);
        assertThat(response.get(0).getRank()).isEqualTo(1);
        assertThat(response.get(0).getHotelName()).isEqualTo("Ritz Carlton");
    }
}
