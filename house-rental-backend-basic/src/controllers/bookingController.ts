import { Request, Response } from 'express';
import { db } from '../config/db';
import { Booking } from '../models/Booking';

export const createBooking = (req: Request, res: Response) => {
  const booking: Booking = req.body;
  // Validate required fields
  if (!booking.property_id || !booking.tenant_id) {
    return res.status(400).json({ message: 'Property ID and Tenant ID are required' });
  }
  // Check booking conflict: a property with an Approved booking cannot be booked again
  db.query<Booking[]>('SELECT * FROM bookings WHERE property_id = ? AND status = "Approved"',
    [booking.property_id], (err, existing) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error checking bookings' });
    }
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Property already booked' });
    }
    // Set initial status to Pending
    booking.status = 'Pending';
    const sql = 'INSERT INTO bookings (property_id, tenant_id, status) VALUES (?,?,?)';
    db.query(sql, [booking.property_id, booking.tenant_id, booking.status], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error creating booking' });
      }
      res.status(201).json({ message: 'Booking request submitted', bookingId: (result as any).insertId });
    });
  });
};

export const getBookings = (req: Request, res: Response) => {
  // If owner, show bookings for properties they own; if tenant, show their bookings
  const user: any = (req as any).user;
  let sql: string;
  let params: any[] = [];
  if (user.role === 'Owner') {
    // Join bookings with properties to filter by owner_id
    sql = `SELECT b.id, b.property_id, b.tenant_id, b.status, b.request_time
           FROM bookings b
           JOIN properties p ON b.property_id = p.id
           WHERE p.owner_id = ?`;
    params = [user.id];
  } else {
    // Tenant
    sql = 'SELECT * FROM bookings WHERE tenant_id = ?';
    params = [user.id];
  }
  db.query<Booking[]>(sql, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching bookings' });
    }
    res.status(200).json(results);
  });
};

export const updateBookingStatus = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const status: 'Pending' | 'Approved' | 'Rejected' = req.body.status;
  if (!['Pending','Approved','Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }
  // Only owner can approve/reject. Verify owner of the property.
  db.query('SELECT p.owner_id, b.tenant_id FROM bookings b JOIN properties p ON b.property_id = p.id WHERE b.id = ?', [id],
    (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    const { owner_id, tenant_id } = (results as any)[0];
    if (owner_id !== (req as any).user.id) {
      return res.status(403).json({ message: 'Forbidden: Not property owner' });
    }
    // Update status
    db.query('UPDATE bookings SET status = ? WHERE id = ?', [status, id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error updating booking' });
      }
      // Notify tenant via Socket.IO (assumes io is attached to app)
      const io = (req.app.get('socketio') as any);
      io?.to(`user_${tenant_id}`).emit('bookingStatus', { bookingId: id, status });
      res.status(200).json({ message: `Booking ${status}` });
    });
  });
};
