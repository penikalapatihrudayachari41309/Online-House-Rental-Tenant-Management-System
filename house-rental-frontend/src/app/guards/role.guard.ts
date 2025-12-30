import { Injectable } from '@angular/core';
import type { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'owner' || userRole === 'admin') {
      return true;
    }
    this.router.navigate(['/properties']);
    return false;
  }
}
