import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  TotalRevenueResponse,
  HotelRevenueResponse,
  MonthlyRevenueResponse,
  StatusCountResponse,
  AverageRevenueResponse,
  TopHotelResponse
} from '../models/analytics.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/analytics`;

  getTotalRevenue(): Observable<TotalRevenueResponse> {
    return this.http.get<TotalRevenueResponse>(`${this.apiUrl}/total-revenue`).pipe(
      catchError(this.handleError)
    );
  }

  getRevenueByHotel(): Observable<HotelRevenueResponse[]> {
    return this.http.get<HotelRevenueResponse[]>(`${this.apiUrl}/revenue-by-hotel`).pipe(
      catchError(this.handleError)
    );
  }

  getRevenueByMonth(): Observable<MonthlyRevenueResponse[]> {
    return this.http.get<MonthlyRevenueResponse[]>(`${this.apiUrl}/revenue-by-month`).pipe(
      catchError(this.handleError)
    );
  }

  getBookingCountByStatus(): Observable<StatusCountResponse[]> {
    return this.http.get<StatusCountResponse[]>(`${this.apiUrl}/booking-count-by-status`).pipe(
      catchError(this.handleError)
    );
  }

  getAverageRevenue(): Observable<AverageRevenueResponse> {
    return this.http.get<AverageRevenueResponse>(`${this.apiUrl}/average-revenue`).pipe(
      catchError(this.handleError)
    );
  }

  getTopHotels(limit: number = 5): Observable<TopHotelResponse[]> {
    return this.http.get<TopHotelResponse[]>(`${this.apiUrl}/top-hotels`, {
      params: { limit: limit.toString() }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = 'An unexpected analytics calculation error occurred.';
    if (error.status === 0) {
      errorMsg = 'Cannot reach backend analytics API at ' + environment.apiUrl + '. Ensure Spring Boot is running.';
    } else if (error.error?.message) {
      errorMsg = error.error.message;
    }
    return throwError(() => new Error(errorMsg));
  }
}
