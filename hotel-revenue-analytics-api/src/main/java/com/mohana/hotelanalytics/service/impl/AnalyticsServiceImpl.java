package com.mohana.hotelanalytics.service.impl;

import com.mohana.hotelanalytics.dto.response.*;
import com.mohana.hotelanalytics.entity.BookingStatus;
import com.mohana.hotelanalytics.repository.BookingRepository;
import com.mohana.hotelanalytics.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final BookingRepository bookingRepository;

    @Override
    @Transactional(readOnly = true)
    public TotalRevenueResponse getTotalRevenue() {
        BigDecimal totalRevenue = bookingRepository.findTotalRevenueOfActiveBookings();
        Long count = bookingRepository.countActiveBookings();

        return TotalRevenueResponse.builder()
                .totalRevenue(totalRevenue != null ? totalRevenue : BigDecimal.ZERO)
                .eligibleBookingsCount(count != null ? count : 0L)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<HotelRevenueResponse> getRevenueByHotel() {
        List<Object[]> results = bookingRepository.findRevenueGroupedByHotel();

        return results.stream().map(row -> HotelRevenueResponse.builder()
                .hotelName((String) row[0])
                .totalRevenue((BigDecimal) row[1])
                .bookingCount((Long) row[2])
                .build()
        ).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MonthlyRevenueResponse> getRevenueByMonth() {
        List<Object[]> results = bookingRepository.findMonthlyRevenueTrend();

        return results.stream().map(row -> MonthlyRevenueResponse.builder()
                .yearMonth((String) row[0])
                .totalRevenue((BigDecimal) row[1])
                .bookingCount((Long) row[2])
                .build()
        ).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<StatusCountResponse> getBookingCountByStatus() {
        List<Object[]> results = bookingRepository.findBookingCountGroupedByStatus();

        return results.stream().map(row -> StatusCountResponse.builder()
                .bookingStatus((BookingStatus) row[0])
                .count((Long) row[1])
                .build()
        ).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AverageRevenueResponse getAverageRevenue() {
        Double avg = bookingRepository.findAverageRevenuePerBooking();
        Long count = bookingRepository.countActiveBookings();

        BigDecimal averageRevenue = avg != null
                ? BigDecimal.valueOf(avg).setScale(2, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        return AverageRevenueResponse.builder()
                .averageRevenuePerBooking(averageRevenue)
                .totalBookingsEvaluated(count != null ? count : 0L)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<TopHotelResponse> getTopHotels(int limit) {
        int targetLimit = limit > 0 ? limit : 5;
        List<Object[]> results = bookingRepository.findTopHotelsByRevenue(PageRequest.of(0, targetLimit));

        List<TopHotelResponse> topHotels = new ArrayList<>();
        int rank = 1;

        for (Object[] row : results) {
            topHotels.add(TopHotelResponse.builder()
                    .rank(rank++)
                    .hotelName((String) row[0])
                    .totalRevenue((BigDecimal) row[1])
                    .totalBookings((Long) row[2])
                    .build());
        }

        return topHotels;
    }
}
