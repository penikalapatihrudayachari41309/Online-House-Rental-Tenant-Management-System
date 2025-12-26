INSERT INTO properties (owner_id,title,description,rent,location,amenities,photos)
VALUES
  (1, 'Sunny Apartment', '2 bed, 1 bath near park', 1200.00, 'Downtown', 'AC,Wifi', 'photos/apartment1.jpg'),
  (1, 'Cozy Cottage', 'Small 1-bed cottage', 800.00, 'Suburb', 'Fireplace,Parking', 'photos/cottage1.jpg');

INSERT INTO bookings (property_id, tenant_id, status)
VALUES
  (1, 2, 'Pending'),
  (2, 3, 'Approved');
