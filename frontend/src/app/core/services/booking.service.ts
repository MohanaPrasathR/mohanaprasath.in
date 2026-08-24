import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking, BookingCreateRequest, BookingUpdateRequest } from '../models/booking.model';
import { ApiErrorResponse } from '../models/api-error.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/bookings`;

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getBookingsByHotel(hotelName: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/hotel/${encodeURIComponent(hotelName)}`).pipe(
      catchError(this.handleError)
    );
  }

  createBooking(request: BookingCreateRequest): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, request).pipe(
      catchError(this.handleError)
    );
  }

  updateBooking(id: number, request: BookingUpdateRequest): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/${id}`, request).pipe(
      catchError(this.handleError)
    );
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = 'An unexpected server error occurred. Please check backend connection.';
    if (error.error && typeof error.error === 'object') {
      const apiErr = error.error as ApiErrorResponse;
      if (apiErr.message) {
        errorMsg = apiErr.message;
      }
      if (apiErr.validationErrors) {
        const fieldMsgs = Object.entries(apiErr.validationErrors)
          .map(([k, v]) => `${k}: ${v}`)
          .join(', ');
        errorMsg = `${errorMsg} (${fieldMsgs})`;
      }
    } else if (error.status === 0) {
      errorMsg = 'Cannot connect to backend server at ' + environment.apiUrl + '. Is Spring Boot running on port 8080?';
    }
    return throwError(() => new Error(errorMsg));
  }
}
