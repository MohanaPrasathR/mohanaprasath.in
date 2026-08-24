package com.mohana.hotelanalytics.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MonthlyRevenueResponse {

    private String yearMonth;
    private BigDecimal totalRevenue;
    private Long bookingCount;
}
