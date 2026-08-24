package com.mohana.hotelanalytics.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohana.hotelanalytics.dto.request.BookingCreateRequest;
import com.mohana.hotelanalytics.dto.response.BookingResponse;
import com.mohana.hotelanalytics.entity.BookingStatus;
import com.mohana.hotelanalytics.entity.RoomType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class BookingFlowIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("End-to-End Integration Flow: Create booking, Fetch by ID, Retrieve Total Revenue Analytics, and Delete")
    void executeFullBookingAndAnalyticsIntegrationFlow() throws Exception {
        // Step 1: Create a new booking
        BookingCreateRequest createRequest = BookingCreateRequest.builder()
                .hotelName("Integration Horizon Hotel")
                .guestName("John Integration")
                .checkInDate(LocalDate.of(2026, 10, 1))
                .checkOutDate(LocalDate.of(2026, 10, 5))
                .guests(2)
                .roomType(RoomType.SUITE)
                .bookingStatus(BookingStatus.CONFIRMED)
                .totalRevenue(new BigDecimal("1200.00"))
                .build();

        MvcResult createResult = mockMvc.perform(post("/api/bookings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.hotelName").value("Integration Horizon Hotel"))
                .andReturn();

        BookingResponse createdBooking = objectMapper.readValue(
                createResult.getResponse().getContentAsString(), BookingResponse.class);

        Long bookingId = createdBooking.getId();
        assertThat(bookingId).isNotNull();

        // Step 2: Fetch booking by ID
        mockMvc.perform(get("/api/bookings/" + bookingId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.guestName").value("John Integration"))
                .andExpect(jsonPath("$.totalRevenue").value(1200.00));

        // Step 3: Verify total revenue analytics incorporates the new booking
        mockMvc.perform(get("/api/analytics/total-revenue"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalRevenue").exists())
                .andExpect(jsonPath("$.eligibleBookingsCount").exists());

        // Step 4: Delete the created booking
        mockMvc.perform(delete("/api/bookings/" + bookingId))
                .andExpect(status().isNoContent());

        // Step 5: Verify 404 Not Found after deletion
        mockMvc.perform(get("/api/bookings/" + bookingId))
                .andExpect(status().isNotFound());
    }
}
