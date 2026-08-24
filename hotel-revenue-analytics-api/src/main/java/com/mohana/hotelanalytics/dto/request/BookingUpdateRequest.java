package com.mohana.hotelanalytics.dto.request;

import com.mohana.hotelanalytics.entity.BookingStatus;
import com.mohana.hotelanalytics.entity.RoomType;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingUpdateRequest {

    @NotBlank(message = "Hotel name is required")
    @Size(max = 100, message = "Hotel name cannot exceed 100 characters")
    private String hotelName;

    @NotBlank(message = "Guest name is required")
    @Size(max = 100, message = "Guest name cannot exceed 100 characters")
    private String guestName;

    @NotNull(message = "Check-in date is required")
    private LocalDate checkInDate;

    @NotNull(message = "Check-out date is required")
    private LocalDate checkOutDate;

    @NotNull(message = "Guests count is required")
    @Min(value = 1, message = "Guests count must be at least 1")
    @Max(value = 10, message = "Guests count cannot exceed 10")
    private Integer guests;

    @NotNull(message = "Room type is required")
    private RoomType roomType;

    @NotNull(message = "Booking status is required")
    private BookingStatus bookingStatus;

    @NotNull(message = "Total revenue is required")
    @DecimalMin(value = "0.00", message = "Total revenue cannot be negative")
    private BigDecimal totalRevenue;
}
