package com.mohana.hotelanalytics.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelRevenueResponse {

    private String hotelName;
    private BigDecimal totalRevenue;
    private Long bookingCount;
}
