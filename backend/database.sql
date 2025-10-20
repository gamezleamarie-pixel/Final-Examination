-- Database: hotel_booking
CREATE DATABASE IF NOT EXISTS hotel_booking CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hotel_booking;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Example: you can insert an admin/test account if desired
-- INSERT INTO users (name, email, password_hash) VALUES ('Test User', 'test@example.com', PASSWORD('secret'));
-- Note: use PHP password_hash instead of MySQL PASSWORD(). The above is only illustrative and commented.
