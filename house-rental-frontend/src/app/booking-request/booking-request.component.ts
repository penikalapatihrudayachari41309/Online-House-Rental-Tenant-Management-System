import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../models/property.model';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-request.component.html',
  styleUrl: './booking-request.component.scss'
})
export class BookingRequestComponent implements OnInit {
  property: Property | null = null;
  bookingSuccess = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Assume property is passed via service or route data
      // For now, placeholder
      this.property = { id: +id, title: 'Sample Property', price: 1000, location: 'Sample Location' } as Property;
    }
  }

  submitBooking() {
    if (this.property) {
      this.bookingService.createBooking({
        property_id: this.property.id,
        tenant_name: 'Sample Tenant',
        tenant_email: 'tenant@example.com',
        start_date: '2024-01-01',
        end_date: '2024-12-31'
      }).subscribe({
        next: () => {
          this.bookingSuccess = true;
          setTimeout(() => this.router.navigate(['/']), 2000);
        },
        error: (err) => {
          this.errorMessage = 'Failed to submit booking';
        }
      });
    }
  }
}
