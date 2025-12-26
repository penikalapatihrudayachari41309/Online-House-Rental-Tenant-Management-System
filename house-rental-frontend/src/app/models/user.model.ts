export interface User {
  id: number;
  role: 'Owner' | 'Tenant' | 'Admin';
}
