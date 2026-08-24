export type RoomType = 'SINGLE' | 'DOUBLE' | 'SUITE' | 'DELUXE' | 'PRESIDENTIAL';

export type BookingStatus = 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';

export interface Booking {
  id: number;
  hotelName: string;
  guestName: string;
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  guests: number;
  roomType: RoomType;
  bookingStatus: BookingStatus;
  totalRevenue: number;
  createdAt: string;
}

export interface BookingCreateRequest {
  hotelName: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  roomType: RoomType;
  bookingStatus: BookingStatus;
  totalRevenue: number;
}

export interface BookingUpdateRequest {
  hotelName: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  roomType: RoomType;
  bookingStatus: BookingStatus;
  totalRevenue: number;
}
