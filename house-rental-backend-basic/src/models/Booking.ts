export interface Booking {
  id?: number;
  property_id: number;
  tenant_id: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  request_time?: Date;
}
