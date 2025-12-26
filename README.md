# Online-House-Rental-Tenant-Management-System
A full-stack web application built using Angular 18, Node.js (TypeScript), Express, and MySQL that enables property owners to list rental houses and tenants to search, view, and request bookings with role-based access control and booking management.

---

## 🎯 Objectives
- Enable owners to list and manage rental properties
- Allow tenants to search, filter, and book houses
- Manage booking approvals and status tracking
- Ensure secure role-based access control

---

## 🧑‍💼 User Roles
- **Owner**: Add properties, manage bookings, view tenants
- **Tenant**: Search properties, view details, request bookings
- **Admin (Optional)**: Monitor users and property listings

---

## 🧩 Tech Stack
### Frontend
- Angular 18
- Angular Material
- TypeScript

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- MySQL

---

## 🗂️ Features
- Property listing with photos, rent, amenities, and location
- Advanced search and filtering
- Booking request and approval workflow
- Real-time booking status updates
- Validation and exception handling
- Role-based routing using Angular Guards

---

## 🛣️ Application Routes
| Path | Description |
|----|----|
| /properties | View all properties |
| /properties/:id | View property details |
| /properties/:id/book | Submit booking request |
| /owner/dashboard | Owner management dashboard |

---

## 🗃️ Database Tables
### Properties
- id, owner_id, title, description, rent, location, amenities, photos, created_at

### Bookings
- id, property_id, tenant_id, status, request_time

---

## ✅ Validation & Security
- Mandatory field checks
- Rent validation
- Booking status enforcement
- Role-based access guards

---

## 🚀 Future Enhancements
- Admin analytics dashboard
- Payment integration
- Email/SMS notifications
- Chat between owner and tenant

---

## 👨‍💻 Developed By
**Penikalapati Hruday Achari**
