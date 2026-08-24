package com.mohana.hotelanalytics.service;

import com.mohana.hotelanalytics.dto.request.BookingCreateRequest;
import com.mohana.hotelanalytics.dto.request.BookingUpdateRequest;
import com.mohana.hotelanalytics.dto.response.BookingResponse;
import com.mohana.hotelanalytics.entity.Booking;
import com.mohana.hotelanalytics.entity.BookingStatus;
import com.mohana.hotelanalytics.entity.RoomType;
import com.mohana.hotelanalytics.exception.InvalidBookingDatesException;
import com.mohana.hotelanalytics.exception.ResourceNotFoundException;
import com.mohana.hotelanalytics.repository.BookingRepository;
import com.mohana.hotelanalytics.service.impl.BookingServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @InjectMocks
    private BookingServiceImpl bookingService;

    private Booking sampleBooking;
    private BookingCreateRequest createRequest;

    @BeforeEach
    void setUp() {
        sampleBooking = Booking.builder()
                .id(1L)
                .hotelName("Grand Hyatt")
                .guestName("John Doe")
                .checkInDate(LocalDate.of(2026, 9, 1))
                .checkOutDate(LocalDate.of(2026, 9, 5))
                .guests(2)
                .roomType(RoomType.DELUXE)
                .bookingStatus(BookingStatus.CONFIRMED)
                .totalRevenue(new BigDecimal("800.00"))
                .createdAt(LocalDateTime.now())
                .build();

        createRequest = BookingCreateRequest.builder()
                .hotelName("Grand Hyatt")
                .guestName("John Doe")
                .checkInDate(LocalDate.of(2026, 9, 1))
                .checkOutDate(LocalDate.of(2026, 9, 5))
                .guests(2)
                .roomType(RoomType.DELUXE)
                .bookingStatus(BookingStatus.CONFIRMED)
                .totalRevenue(new BigDecimal("800.00"))
                .build();
    }

    @Test
    @DisplayName("Should successfully create a booking when input is valid")
    void createBooking_Success() {
        when(bookingRepository.save(any(Booking.class))).thenReturn(sampleBooking);

        BookingResponse response = bookingService.createBooking(createRequest);

        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getHotelName()).isEqualTo("Grand Hyatt");
        assertThat(response.getTotalRevenue()).isEqualTo(new BigDecimal("800.00"));
        verify(bookingRepository, times(1)).save(any(Booking.class));
    }

    @Test
    @DisplayName("Should throw InvalidBookingDatesException when checkOutDate is before checkInDate")
    void createBooking_InvalidDates_ThrowsException() {
        createRequest.setCheckOutDate(LocalDate.of(2026, 8, 30)); // Before check-in date Sept 1

        assertThatThrownBy(() -> bookingService.createBooking(createRequest))
                .isInstanceOf(InvalidBookingDatesException.class)
                .hasMessageContaining("must be strictly after check-in date");

        verify(bookingRepository, never()).save(any(Booking.class));
    }

    @Test
    @DisplayName("Should return booking response when valid ID is provided")
    void getBookingById_Success() {
        when(bookingRepository.findById(1L)).thenReturn(Optional.of(sampleBooking));

        BookingResponse response = bookingService.getBookingById(1L);

        assertThat(response).isNotNull();
        assertThat(response.getGuestName()).isEqualTo("John Doe");
        verify(bookingRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when booking ID does not exist")
    void getBookingById_NotFound_ThrowsException() {
        when(bookingRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> bookingService.getBookingById(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Booking not found with ID: 99");
    }

    @Test
    @DisplayName("Should successfully update existing booking")
    void updateBooking_Success() {
        BookingUpdateRequest updateRequest = BookingUpdateRequest.builder()
                .hotelName("Grand Hyatt Updated")
                .guestName("John Doe")
                .checkInDate(LocalDate.of(2026, 9, 1))
                .checkOutDate(LocalDate.of(2026, 9, 6))
                .guests(2)
                .roomType(RoomType.SUITE)
                .bookingStatus(BookingStatus.CHECKED_IN)
                .totalRevenue(new BigDecimal("1000.00"))
                .build();

        when(bookingRepository.findById(1L)).thenReturn(Optional.of(sampleBooking));
        when(bookingRepository.save(any(Booking.class))).thenReturn(sampleBooking);

        BookingResponse response = bookingService.updateBooking(1L, updateRequest);

        assertThat(response).isNotNull();
        verify(bookingRepository, times(1)).findById(1L);
        verify(bookingRepository, times(1)).save(any(Booking.class));
    }

    @Test
    @DisplayName("Should delete booking when ID exists")
    void deleteBooking_Success() {
        when(bookingRepository.existsById(1L)).thenReturn(true);
        doNothing().when(bookingRepository).deleteById(1L);

        bookingService.deleteBooking(1L);

        verify(bookingRepository, times(1)).existsById(1L);
        verify(bookingRepository, times(1)).deleteById(1L);
    }
}
