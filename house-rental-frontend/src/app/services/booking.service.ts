import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  id: number;
  property_id: number;
  tenant_id: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  request_time: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3002/api';

  constructor(private http: HttpClient) { }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`);
  }

  createBooking(booking: Omit<Booking, 'id' | 'request_time'>): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookings`, booking);
  }

  updateBookingStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/bookings/${id}`, { status });
  }
}
