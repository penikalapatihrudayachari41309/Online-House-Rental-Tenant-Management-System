import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { OwnerGuard } from './guards/owner.guard';
import { TenantGuard } from './guards/tenant.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/properties', pathMatch: 'full' },
  { path: 'properties', loadComponent: () => import('./components/property-list/property-list.component').then(m => m.PropertyListComponent) },
  { path: 'properties/:id', loadComponent: () => import('./components/property-details/property-details.component').then(m => m.PropertyDetailsComponent) },
  { path: 'booking/:id', loadComponent: () => import('./components/booking-request/booking-request.component').then(m => m.BookingRequestComponent), canActivate: [TenantGuard] },
  { path: 'owner-dashboard', loadComponent: () => import('./components/owner-dashboard/owner-dashboard.component').then(m => m.OwnerDashboardComponent), canActivate: [OwnerGuard] }
];
