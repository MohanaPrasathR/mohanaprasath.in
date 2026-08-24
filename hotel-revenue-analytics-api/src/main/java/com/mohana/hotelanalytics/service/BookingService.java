package com.mohana.hotelanalytics.service;

import com.mohana.hotelanalytics.dto.request.BookingCreateRequest;
import com.mohana.hotelanalytics.dto.request.BookingUpdateRequest;
import com.mohana.hotelanalytics.dto.response.BookingResponse;

import java.util.List;

public interface BookingService {

    BookingResponse createBooking(BookingCreateRequest request);

    List<BookingResponse> getAllBookings();

    BookingResponse getBookingById(Long id);

    BookingResponse updateBooking(Long id, BookingUpdateRequest request);

    void deleteBooking(Long id);

    List<BookingResponse> getBookingsByHotel(String hotelName);
}
