package com.mohana.hotelanalytics.controller;

import com.mohana.hotelanalytics.dto.response.*;
import com.mohana.hotelanalytics.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/total-revenue")
    public ResponseEntity<TotalRevenueResponse> getTotalRevenue() {
        TotalRevenueResponse response = analyticsService.getTotalRevenue();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/revenue-by-hotel")
    public ResponseEntity<List<HotelRevenueResponse>> getRevenueByHotel() {
        List<HotelRevenueResponse> response = analyticsService.getRevenueByHotel();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/revenue-by-month")
    public ResponseEntity<List<MonthlyRevenueResponse>> getRevenueByMonth() {
        List<MonthlyRevenueResponse> response = analyticsService.getRevenueByMonth();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/booking-count-by-status")
    public ResponseEntity<List<StatusCountResponse>> getBookingCountByStatus() {
        List<StatusCountResponse> response = analyticsService.getBookingCountByStatus();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/average-revenue")
    public ResponseEntity<AverageRevenueResponse> getAverageRevenue() {
        AverageRevenueResponse response = analyticsService.getAverageRevenue();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/top-hotels")
    public ResponseEntity<List<TopHotelResponse>> getTopHotels(
            @RequestParam(defaultValue = "5") int limit) {
        List<TopHotelResponse> response = analyticsService.getTopHotels(limit);
        return ResponseEntity.ok(response);
    }
}
