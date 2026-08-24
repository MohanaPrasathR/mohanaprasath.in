-- Real-world Fictional Sample Hotel Bookings Data Script
-- Seed data for testing, analytics verification, and demonstration

INSERT INTO bookings (hotel_name, guest_name, check_in_date, check_out_date, guests, room_type, booking_status, total_revenue, created_at)
VALUES 
('Grand Horizon Resort', 'Alexander Wright', '2026-05-10', '2026-05-15', 2, 'DELUXE', 'CHECKED_OUT', 1250.00, CURRENT_TIMESTAMP),
('Grand Horizon Resort', 'Sophia Martinez', '2026-05-18', '2026-05-22', 1, 'SINGLE', 'CHECKED_OUT', 600.00, CURRENT_TIMESTAMP),
('Grand Horizon Resort', 'David Chen', '2026-06-01', '2026-06-07', 4, 'SUITE', 'CHECKED_OUT', 2400.00, CURRENT_TIMESTAMP),
('Royal Palm Haven', 'Emma Watson', '2026-06-12', '2026-06-15', 2, 'DOUBLE', 'CHECKED_OUT', 900.00, CURRENT_TIMESTAMP),
('Royal Palm Haven', 'Michael Brown', '2026-07-01', '2026-07-05', 2, 'DELUXE', 'CHECKED_OUT', 1500.00, CURRENT_TIMESTAMP),
('Royal Palm Haven', 'Olivia Davis', '2026-07-10', '2026-07-12', 1, 'SINGLE', 'CANCELLED', 300.00, CURRENT_TIMESTAMP),
('Starlight Palace Hotel', 'James Wilson', '2026-07-20', '2026-07-27', 2, 'PRESIDENTIAL', 'CHECKED_OUT', 5600.00, CURRENT_TIMESTAMP),
('Starlight Palace Hotel', 'Isabella Garcia', '2026-08-01', '2026-08-04', 3, 'DELUXE', 'CHECKED_IN', 1100.00, CURRENT_TIMESTAMP),
('Starlight Palace Hotel', 'Liam Miller', '2026-08-15', '2026-08-20', 2, 'SUITE', 'CONFIRMED', 1850.00, CURRENT_TIMESTAMP),
('Azure Bay Suites', 'Ethan Taylor', '2026-08-22', '2026-08-25', 2, 'DOUBLE', 'CONFIRMED', 750.00, CURRENT_TIMESTAMP),
('Azure Bay Suites', 'Charlotte Anderson', '2026-09-02', '2026-09-08', 2, 'SUITE', 'CONFIRMED', 2100.00, CURRENT_TIMESTAMP),
('Azure Bay Suites', 'Benjamin Thomas', '2026-09-12', '2026-09-14', 1, 'SINGLE', 'CONFIRMED', 380.00, CURRENT_TIMESTAMP);
