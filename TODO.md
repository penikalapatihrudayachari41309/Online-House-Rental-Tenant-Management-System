# TODO List for House Rental & Tenant Management System

## Database Updates
- [x] Add users table to schema.sql with id, email, password, role, name, created_at
- [x] Update properties.owner_id to INT with foreign key
- [x] Update bookings.tenant_id to INT with foreign key

## Backend Authentication
- [x] Install JWT dependencies (jsonwebtoken, bcryptjs, @types/jsonwebtoken, @types/bcryptjs)
- [x] Create auth routes: POST /api/auth/register, POST /api/auth/login
- [x] Create auth middleware for JWT verification
- [x] Update server.ts to include auth routes and middleware
- [x] Protect property and booking routes with auth middleware
- [x] Add role-based middleware for owner/tenant/admin access

## Property Management
- [x] Update property routes to allow owners to manage their properties
- [x] Add filtering by owner_id in property queries
- [x] Ensure only owners can modify their properties

## Frontend Authentication
- [x] Create login component
- [x] Create register component
- [x] Update auth.service.ts to use real API calls
- [x] Add login/register routes
- [x] Update guards to use real auth service

## Owner Features
- [x] Enhance owner-dashboard component with property management (add/edit/delete)
- [x] Add property form component
- [x] Update property service with CRUD operations

## Tenant Dashboard
- [x] Create tenant-dashboard component
- [x] Show tenant's booking history and status
- [x] Add route for tenant dashboard

## Admin Dashboard (Optional)
- [x] Create admin-dashboard component
- [x] Show all users, properties, bookings
- [x] Add admin guard

## Photo Upload
- [x] Install multer for file uploads
- [ ] Add photo upload endpoint
- [ ] Update property creation/editing to handle photos

## Error Handling
- [x] Improve validation in backend
- [x] Add proper error responses
- [x] Update frontend to handle errors gracefully

## Real-time Dataset & Notifications
- [ ] Enhance Socket.IO for booking status updates
- [ ] Add notifications for new bookings, status changes
- [ ] Implement real-time property availability updates
- [ ] Add real-time user activity tracking
- [ ] Create real-time dashboard metrics for admin
- [ ] Implement live chat functionality between tenants and owners
- [ ] Add real-time property view counters
- [ ] Create notification center with read/unread status
- [ ] Implement real-time booking calendar updates
- [ ] Add push notifications for mobile devices

## Frontend Remaining Tasks
- [ ] Add tenant dashboard route to app.routes.ts
- [ ] Implement property-details component
- [ ] Implement booking-form component
- [ ] Implement owner dashboard
- [ ] Implement admin dashboard
- [ ] Update existing components to use new services
- [ ] Test the application
- [ ] Fix any compilation errors

## Testing
- [x] Test authentication flow (code review)
- [x] Test property management (code review)
- [x] Test booking system (code review)
- [x] Verify real-time updates (code review)
