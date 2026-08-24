package com.mohana.hotelanalytics.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohana.hotelanalytics.dto.request.BookingCreateRequest;
import com.mohana.hotelanalytics.dto.response.BookingResponse;
import com.mohana.hotelanalytics.entity.BookingStatus;
import com.mohana.hotelanalytics.entity.RoomType;
import com.mohana.hotelanalytics.exception.ResourceNotFoundException;
import com.mohana.hotelanalytics.service.BookingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BookingController.class)
class BookingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private BookingService bookingService;

    private BookingResponse sampleResponse;
    private BookingCreateRequest createRequest;

    @BeforeEach
    void setUp() {
        sampleResponse = BookingResponse.builder()
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
    @DisplayName("POST /api/bookings should return 201 Created and response body")
    void createBooking_ShouldReturn201() throws Exception {
        when(bookingService.createBooking(any(BookingCreateRequest.class))).thenReturn(sampleResponse);

        mockMvc.perform(post("/api/bookings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.hotelName").value("Grand Hyatt"))
                .andExpect(jsonPath("$.totalRevenue").value(800.00));
    }

    @Test
    @DisplayName("POST /api/bookings with invalid request should return 400 Bad Request")
    void createBooking_InvalidValidation_ShouldReturn400() throws Exception {
        createRequest.setHotelName(""); // Invalid blank name

        mockMvc.perform(post("/api/bookings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.error").value("Validation Failed"));
    }

    @Test
    @DisplayName("GET /api/bookings/{id} should return 200 OK")
    void getBookingById_ShouldReturn200() throws Exception {
        when(bookingService.getBookingById(1L)).thenReturn(sampleResponse);

        mockMvc.perform(get("/api/bookings/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.guestName").value("John Doe"));
    }

    @Test
    @DisplayName("GET /api/bookings/{id} when not found should return 404 Not Found")
    void getBookingById_NotFound_ShouldReturn404() throws Exception {
        when(bookingService.getBookingById(99L)).thenThrow(new ResourceNotFoundException("Booking not found with ID: 99"));

        mockMvc.perform(get("/api/bookings/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("Booking not found with ID: 99"));
    }

    @Test
    @DisplayName("DELETE /api/bookings/{id} should return 204 No Content")
    void deleteBooking_ShouldReturn204() throws Exception {
        doNothing().when(bookingService).deleteBooking(1L);

        mockMvc.perform(delete("/api/bookings/1"))
                .andExpect(status().isNoContent());
    }
}
