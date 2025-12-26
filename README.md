# Online House Rental & Tenant Management System

A full-stack web application for managing house rentals and tenant bookings with real-time updates.

## Features

- Property listing and details
- Booking requests for tenants
- Owner dashboard for managing properties and bookings
- Real-time status updates for tenants
- Role-based access control (Auth and Role guards)
- Responsive UI with Angular Material

## Technologies Used

### Frontend
- Angular 18
- Angular Material 18
- TypeScript 5.4+
- Socket.IO Client 4.x

### Backend
- Node.js 18+ LTS
- Express 4.19
- TypeScript 5.4+
- MySQL 8.0
- Socket.IO 4.x
- CORS, dotenv, express-validator

### Database
- MySQL 8.0
- Tables: properties, bookings

## Prerequisites

- Node.js v18.x LTS (npm 9.x or 10.x)
- MySQL Server 8.0.x
- Visual Studio Code (v1.85+)
- VS Code Extensions:
  - Angular Language Service v18.x
  - Angular Snippets v17+
  - ESLint v2.4+
  - Prettier v10+
  - TypeScript Importer v0.8+
  - DotENV v1.0+
  - REST Client v0.25+
  - MySQL (Weijan Chen) v6.0+

## Installation

### 1. Clone or Setup Project

The project is set up in the current directory with folders:
- `house-rental-backend/`
- `house-rental-frontend/`

### 2. Database Setup

1. Start MySQL Server
2. Create database:
   ```sql
   CREATE DATABASE IF NOT EXISTS house_rental;
   ```
3. Run the schema:
   ```sql
   USE house_rental;
   -- Run contents of house-rental-backend/schema.sql
   ```

### 3. Backend Setup

1. Navigate to backend directory:
   ```bash
   cd house-rental-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=house_rental
   PORT=3000
   ```
4. Build and run:
   ```bash
   npm run build
   npm run dev
   ```
   Server will run on http://localhost:3000

### 4. Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd house-rental-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   ng serve
   ```
   Application will run on http://localhost:4200

## API Endpoints

### Properties
- `GET /api/properties` - Get all properties

### Bookings
- `POST /api/bookings` - Create a new booking

## Database Schema

### Properties Table
```sql
CREATE TABLE properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  location VARCHAR(255),
  owner_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT,
  tenant_name VARCHAR(255),
  tenant_email VARCHAR(255),
  start_date DATE,
  end_date DATE,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id)
);
```

## Usage

1. Start the backend server (`npm run dev` in backend directory)
2. Start the frontend application (`ng serve` in frontend directory)
3. Open browser to http://localhost:4200
4. Navigate through property listings, view details, make bookings
5. Owners can manage properties and bookings via dashboard
6. Real-time updates are handled via Socket.IO

## Project Structure

```
house-rental/
├── house-rental-backend/
│   ├── src/
│   │   └── server.ts
│   ├── schema.sql
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── house-rental-frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── property-list/
│   │   │   ├── property-details/
│   │   │   ├── booking-request/
│   │   │   ├── owner-dashboard/
│   │   │   ├── guards/
│   │   │   └── app.routes.ts
│   │   └── styles.scss
│   ├── package.json
│   └── angular.json
└── README.md
```

## Development

### Adding New Components
```bash
ng generate component component-name
```

### Adding Guards
```bash
ng generate guard guards/guard-name
```

### Building for Production
```bash
# Backend
npm run build

# Frontend
ng build --prod
```

## Contributing

1. Follow the coding standards
2. Use ESLint and Prettier for code formatting
3. Test thoroughly before committing

## License

ISC
