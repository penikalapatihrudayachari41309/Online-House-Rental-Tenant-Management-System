# TODO for Online House Rental & Tenant Management System Implementation

## Completed
- [x] Install required software versions (Node.js, MySQL, Angular CLI)
- [x] Create backend directory and initialize npm
- [x] Install backend runtime dependencies (express, mysql2, cors, dotenv, express-validator)
- [x] Install backend dev dependencies (typescript, ts-node, nodemon, @types/*)
- [x] Initialize TypeScript config
- [x] Create server.ts with basic API and Socket.IO
- [x] Create schema.sql for database tables
- [x] Update package.json scripts
- [x] Create .env file for backend
- [x] Start ng new for frontend with no SSR

## Pending
- [ ] Update schema.sql to include photos, amenities, tenant_id in bookings, owner_id in properties
- [ ] Update server.ts with additional routes: add property, get property by id, update booking status, file upload for photos
- [ ] Add validation and error handling in backend
- [ ] Complete frontend npm install
- [ ] Add Angular Material to frontend
- [ ] Generate components: property-list, property-details, booking-request, owner-dashboard
- [ ] Generate guards: auth, role
- [ ] Update app-routing.module.ts with specified routes (/properties, /properties/:id, /properties/:id/book, /owner/dashboard)
- [ ] Install socket.io-client in frontend
- [ ] Run schema.sql to create database tables
- [ ] Test backend with npm run dev
- [ ] Test frontend with ng serve
- [ ] Implement API services in frontend for properties and bookings
- [ ] Implement real-time updates for booking status
- [ ] Add role-based access logic (mock roles for now)
- [ ] Add search/filter functionality in property-list
- [ ] Add file upload for photos in owner dashboard
- [ ] Handle exceptions and display error messages in UI
- [ ] Add success notifications for booking submission
- [ ] Implement admin role with basic analytics (optional)
- [ ] Generate dummy data for testing
- [ ] Final testing and validation of all features
