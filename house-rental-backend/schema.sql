CREATE DATABASE IF NOT EXISTS house_rental;

USE house_rental;

CREATE TABLE properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  rent DECIMAL(10,2) NOT NULL,
  location VARCHAR(255),
  amenities TEXT,
  photos TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT,
  tenant_id VARCHAR(255),
  tenant_name VARCHAR(255),
  tenant_email VARCHAR(255),
  start_date DATE,
  end_date DATE,
  status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
  request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id)
);
