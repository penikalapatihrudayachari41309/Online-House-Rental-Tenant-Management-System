import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { BookingService, Booking } from '../../services/booking.service';
import { PropertyService, Property } from '../../services/property.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './owner-dashboard.component.html',
  styleUrl: './owner-dashboard.component.scss'
})
export class OwnerDashboardComponent implements OnInit {
  properties: Property[] = [];
  bookings: Booking[] = [];
  displayedColumns: string[] = ['tenant_name', 'property_title', 'status', 'actions'];

  constructor(
    private bookingService: BookingService,
    private propertyService: PropertyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProperties();
    this.loadBookings();
  }

  loadProperties(): void {
    this.propertyService.getProperties().subscribe({
      next: (data) => this.properties = data,
      error: (err) => console.error('Error loading properties:', err)
    });
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe({
      next: (data) => this.bookings = data,
      error: (err) => console.error('Error loading bookings:', err)
    });
  }

  approveBooking(bookingId: number): void {
    this.bookingService.updateBookingStatus(bookingId, 'Approved').subscribe({
      next: () => {
        this.snackBar.open('Booking approved!', 'Close', { duration: 3000 });
        this.loadBookings();
      },
      error: (err) => {
        console.error('Error approving booking:', err);
        this.snackBar.open('Error approving booking', 'Close', { duration: 3000 });
      }
    });
  }

  rejectBooking(bookingId: number): void {
    this.bookingService.updateBookingStatus(bookingId, 'Rejected').subscribe({
      next: () => {
        this.snackBar.open('Booking rejected!', 'Close', { duration: 3000 });
        this.loadBookings();
      },
      error: (err) => {
        console.error('Error rejecting booking:', err);
        this.snackBar.open('Error rejecting booking', 'Close', { duration: 3000 });
      }
    });
  }

  getPropertyTitle(propertyId: number): string {
    const property = this.properties.find(p => p.id === propertyId);
    return property ? property.title : 'Unknown';
  }
}
