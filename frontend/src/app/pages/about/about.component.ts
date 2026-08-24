import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  apiEndpoints = [
    { method: 'POST', path: '/api/bookings', desc: 'Create a new hotel booking with strict validation rules', status: '201 Created' },
    { method: 'GET', path: '/api/bookings', desc: 'Retrieve all reservation records stored in database', status: '200 OK' },
    { method: 'GET', path: '/api/bookings/{id}', desc: 'Lookup reservation details by primary key ID', status: '200 OK / 404 Not Found' },
    { method: 'PUT', path: '/api/bookings/{id}', desc: 'Update details for an existing booking', status: '200 OK / 400 Bad Request' },
    { method: 'DELETE', path: '/api/bookings/{id}', desc: 'Remove a booking record from repository', status: '204 No Content / 404 Not Found' },
    { method: 'GET', path: '/api/bookings/hotel/{hotelName}', desc: 'Search bookings by property name (case-insensitive)', status: '200 OK' },
    { method: 'GET', path: '/api/analytics/total-revenue', desc: 'Calculate cumulative realized revenue (non-cancelled)', status: '200 OK' },
    { method: 'GET', path: '/api/analytics/revenue-by-hotel', desc: 'Revenue breakdown grouped per hotel property', status: '200 OK' },
    { method: 'GET', path: '/api/analytics/revenue-by-month', desc: 'Time-series monthly revenue trends (YYYY-MM)', status: '200 OK' },
    { method: 'GET', path: '/api/analytics/booking-count-by-status', desc: 'Operational booking count grouped by status', status: '200 OK' },
    { method: 'GET', path: '/api/analytics/average-revenue', desc: 'Mean revenue yield per active reservation', status: '200 OK' },
    { method: 'GET', path: '/api/analytics/top-hotels?limit=5', desc: 'Ranked top N hotels by total revenue', status: '200 OK' }
  ];
}
