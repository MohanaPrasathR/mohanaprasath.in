package com.mohana.hotelanalytics.controller;

import com.mohana.hotelanalytics.dto.response.*;
import com.mohana.hotelanalytics.entity.BookingStatus;
import com.mohana.hotelanalytics.service.AnalyticsService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AnalyticsController.class)
class AnalyticsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AnalyticsService analyticsService;

    @Test
    @DisplayName("GET /api/analytics/total-revenue should return 200 OK")
    void getTotalRevenue_ShouldReturn200() throws Exception {
        TotalRevenueResponse response = TotalRevenueResponse.builder()
                .totalRevenue(new BigDecimal("12500.00"))
                .eligibleBookingsCount(15L)
                .build();

        when(analyticsService.getTotalRevenue()).thenReturn(response);

        mockMvc.perform(get("/api/analytics/total-revenue"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalRevenue").value(12500.00))
                .andExpect(jsonPath("$.eligibleBookingsCount").value(15));
    }

    @Test
    @DisplayName("GET /api/analytics/revenue-by-hotel should return 200 OK")
    void getRevenueByHotel_ShouldReturn200() throws Exception {
        HotelRevenueResponse hotel = HotelRevenueResponse.builder()
                .hotelName("Grand Hyatt")
                .totalRevenue(new BigDecimal("5000.00"))
                .bookingCount(5L)
                .build();

        when(analyticsService.getRevenueByHotel()).thenReturn(List.of(hotel));

        mockMvc.perform(get("/api/analytics/revenue-by-hotel"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].hotelName").value("Grand Hyatt"))
                .andExpect(jsonPath("$[0].totalRevenue").value(5000.00));
    }

    @Test
    @DisplayName("GET /api/analytics/revenue-by-month should return 200 OK")
    void getRevenueByMonth_ShouldReturn200() throws Exception {
        MonthlyRevenueResponse month = MonthlyRevenueResponse.builder()
                .yearMonth("2026-09")
                .totalRevenue(new BigDecimal("4200.00"))
                .bookingCount(4L)
                .build();

        when(analyticsService.getRevenueByMonth()).thenReturn(List.of(month));

        mockMvc.perform(get("/api/analytics/revenue-by-month"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].yearMonth").value("2026-09"))
                .andExpect(jsonPath("$[0].totalRevenue").value(4200.00));
    }

    @Test
    @DisplayName("GET /api/analytics/booking-count-by-status should return 200 OK")
    void getBookingCountByStatus_ShouldReturn200() throws Exception {
        StatusCountResponse statusResponse = StatusCountResponse.builder()
                .bookingStatus(BookingStatus.CONFIRMED)
                .count(10L)
                .build();

        when(analyticsService.getBookingCountByStatus()).thenReturn(List.of(statusResponse));

        mockMvc.perform(get("/api/analytics/booking-count-by-status"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].bookingStatus").value("CONFIRMED"))
                .andExpect(jsonPath("$[0].count").value(10));
    }

    @Test
    @DisplayName("GET /api/analytics/average-revenue should return 200 OK")
    void getAverageRevenue_ShouldReturn200() throws Exception {
        AverageRevenueResponse avgResponse = AverageRevenueResponse.builder()
                .averageRevenuePerBooking(new BigDecimal("650.00"))
                .totalBookingsEvaluated(12L)
                .build();

        when(analyticsService.getAverageRevenue()).thenReturn(avgResponse);

        mockMvc.perform(get("/api/analytics/average-revenue"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.averageRevenuePerBooking").value(650.00));
    }

    @Test
    @DisplayName("GET /api/analytics/top-hotels should return 200 OK")
    void getTopHotels_ShouldReturn200() throws Exception {
        TopHotelResponse topHotel = TopHotelResponse.builder()
                .rank(1)
                .hotelName("Four Seasons")
                .totalRevenue(new BigDecimal("8000.00"))
                .totalBookings(8L)
                .build();

        when(analyticsService.getTopHotels(5)).thenReturn(List.of(topHotel));

        mockMvc.perform(get("/api/analytics/top-hotels?limit=5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].rank").value(1))
                .andExpect(jsonPath("$[0].hotelName").value("Four Seasons"));
    }
}
