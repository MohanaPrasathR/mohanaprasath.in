package com.mohana.hotelanalytics.dto.response;

import com.mohana.hotelanalytics.entity.BookingStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatusCountResponse {

    private BookingStatus bookingStatus;
    private Long count;
}
