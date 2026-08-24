package com.mohana.hotelanalytics.service.impl;

import com.mohana.hotelanalytics.dto.request.BookingCreateRequest;
import com.mohana.hotelanalytics.dto.request.BookingUpdateRequest;
import com.mohana.hotelanalytics.dto.response.BookingResponse;
import com.mohana.hotelanalytics.entity.Booking;
import com.mohana.hotelanalytics.exception.InvalidBookingDatesException;
import com.mohana.hotelanalytics.exception.ResourceNotFoundException;
import com.mohana.hotelanalytics.repository.BookingRepository;
import com.mohana.hotelanalytics.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    @Override
    @Transactional
    public BookingResponse createBooking(BookingCreateRequest request) {
        validateDates(request.getCheckInDate(), request.getCheckOutDate());

        Booking booking = Booking.builder()
                .hotelName(request.getHotelName().trim())
                .guestName(request.getGuestName().trim())
                .checkInDate(request.getCheckInDate())
                .checkOutDate(request.getCheckOutDate())
                .guests(request.getGuests())
                .roomType(request.getRoomType())
                .bookingStatus(request.getBookingStatus())
                .totalRevenue(request.getTotalRevenue())
                .build();

        Booking savedBooking = bookingRepository.save(booking);
        return mapToResponse(savedBooking);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public BookingResponse getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));
        return mapToResponse(booking);
    }

    @Override
    @Transactional
    public BookingResponse updateBooking(Long id, BookingUpdateRequest request) {
        Booking existingBooking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));

        validateDates(request.getCheckInDate(), request.getCheckOutDate());

        existingBooking.setHotelName(request.getHotelName().trim());
        existingBooking.setGuestName(request.getGuestName().trim());
        existingBooking.setCheckInDate(request.getCheckInDate());
        existingBooking.setCheckOutDate(request.getCheckOutDate());
        existingBooking.setGuests(request.getGuests());
        existingBooking.setRoomType(request.getRoomType());
        existingBooking.setBookingStatus(request.getBookingStatus());
        existingBooking.setTotalRevenue(request.getTotalRevenue());

        Booking updatedBooking = bookingRepository.save(existingBooking);
        return mapToResponse(updatedBooking);
    }

    @Override
    @Transactional
    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new ResourceNotFoundException("Booking not found with ID: " + id);
        }
        bookingRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingResponse> getBookingsByHotel(String hotelName) {
        return bookingRepository.findByHotelNameIgnoreCase(hotelName.trim()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private void validateDates(LocalDate checkIn, LocalDate checkOut) {
        if (checkOut.isBefore(checkIn) || checkOut.isEqual(checkIn)) {
            throw new InvalidBookingDatesException(
                    "Check-out date (" + checkOut + ") must be strictly after check-in date (" + checkIn + ")"
            );
        }
    }

    private BookingResponse mapToResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .hotelName(booking.getHotelName())
                .guestName(booking.getGuestName())
                .checkInDate(booking.getCheckInDate())
                .checkOutDate(booking.getCheckOutDate())
                .guests(booking.getGuests())
                .roomType(booking.getRoomType())
                .bookingStatus(booking.getBookingStatus())
                .totalRevenue(booking.getTotalRevenue())
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
