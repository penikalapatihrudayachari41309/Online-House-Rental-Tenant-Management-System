import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Simulate a logged-in user
  currentUser: User = { id: 1, role: 'Tenant' };  // or 'Owner'
  
  isTenant(): boolean { return this.currentUser.role === 'Tenant'; }
  isOwner(): boolean { return this.currentUser.role === 'Owner'; }
}
