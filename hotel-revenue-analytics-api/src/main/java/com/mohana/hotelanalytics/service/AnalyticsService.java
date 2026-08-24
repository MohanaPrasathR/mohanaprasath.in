package com.mohana.hotelanalytics.service;

import com.mohana.hotelanalytics.dto.response.*;

import java.util.List;

public interface AnalyticsService {

    TotalRevenueResponse getTotalRevenue();

    List<HotelRevenueResponse> getRevenueByHotel();

    List<MonthlyRevenueResponse> getRevenueByMonth();

    List<StatusCountResponse> getBookingCountByStatus();

    AverageRevenueResponse getAverageRevenue();

    List<TopHotelResponse> getTopHotels(int limit);
}
