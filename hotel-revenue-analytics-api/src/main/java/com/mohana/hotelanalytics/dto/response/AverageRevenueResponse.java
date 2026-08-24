package com.mohana.hotelanalytics.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AverageRevenueResponse {

    private BigDecimal averageRevenuePerBooking;
    private Long totalBookingsEvaluated;
}
