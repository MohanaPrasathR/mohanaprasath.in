package com.mohana.hotelanalytics.dto.response;

import com.mohana.hotelanalytics.entity.BookingStatus;
import com.mohana.hotelanalytics.entity.RoomType;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {

    private Long id;
    private String hotelName;
    private String guestName;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer guests;
    private RoomType roomType;
    private BookingStatus bookingStatus;
    private BigDecimal totalRevenue;
    private LocalDateTime createdAt;
}
