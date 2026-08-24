package com.mohana.hotelanalytics.repository;

import com.mohana.hotelanalytics.entity.Booking;
import com.mohana.hotelanalytics.entity.BookingStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByHotelNameIgnoreCase(String hotelName);

    List<Booking> findByBookingStatus(BookingStatus bookingStatus);

    /**
     * Query 1: Calculates total revenue across non-cancelled bookings.
     */
    @Query("SELECT SUM(b.totalRevenue) FROM Booking b WHERE b.bookingStatus <> com.mohana.hotelanalytics.entity.BookingStatus.CANCELLED")
    BigDecimal findTotalRevenueOfActiveBookings();

    /**
     * Query 1b: Counts total non-cancelled bookings.
     */
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.bookingStatus <> com.mohana.hotelanalytics.entity.BookingStatus.CANCELLED")
    Long countActiveBookings();

    /**
     * Query 2: Groups cumulative revenue and booking count by hotel name.
     */
    @Query("SELECT b.hotelName, SUM(b.totalRevenue), COUNT(b) " +
           "FROM Booking b " +
           "WHERE b.bookingStatus <> com.mohana.hotelanalytics.entity.BookingStatus.CANCELLED " +
           "GROUP BY b.hotelName " +
           "ORDER BY SUM(b.totalRevenue) DESC")
    List<Object[]> findRevenueGroupedByHotel();

    /**
     * Query 3: Groups revenue by check-in month (YYYY-MM) across both H2 and MySQL databases.
     */
    @Query("SELECT SUBSTRING(CAST(b.checkInDate AS string), 1, 7), SUM(b.totalRevenue), COUNT(b) " +
           "FROM Booking b " +
           "WHERE b.bookingStatus <> com.mohana.hotelanalytics.entity.BookingStatus.CANCELLED " +
           "GROUP BY SUBSTRING(CAST(b.checkInDate AS string), 1, 7) " +
           "ORDER BY SUBSTRING(CAST(b.checkInDate AS string), 1, 7) ASC")
    List<Object[]> findMonthlyRevenueTrend();

    /**
     * Query 4: Groups total booking count by BookingStatus enum value.
     */
    @Query("SELECT b.bookingStatus, COUNT(b) " +
           "FROM Booking b " +
           "GROUP BY b.bookingStatus")
    List<Object[]> findBookingCountGroupedByStatus();

    /**
     * Query 5: Calculates average revenue per non-cancelled booking.
     */
    @Query("SELECT AVG(b.totalRevenue) FROM Booking b WHERE b.bookingStatus <> com.mohana.hotelanalytics.entity.BookingStatus.CANCELLED")
    Double findAverageRevenuePerBooking();

    /**
     * Query 6: Retrieves top N hotels ordered by total cumulative revenue using Pageable limit.
     */
    @Query("SELECT b.hotelName, SUM(b.totalRevenue), COUNT(b) " +
           "FROM Booking b " +
           "WHERE b.bookingStatus <> com.mohana.hotelanalytics.entity.BookingStatus.CANCELLED " +
           "GROUP BY b.hotelName " +
           "ORDER BY SUM(b.totalRevenue) DESC")
    List<Object[]> findTopHotelsByRevenue(Pageable pageable);
}
