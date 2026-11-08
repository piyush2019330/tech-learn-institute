-- ==========================================================================
-- TECH LEARN INSTITUTE - COMPLETE MYSQL DATABASE SETUP
-- Database Name: Tech_learn
-- Admin Contact: WhatsApp: 8974003523 | Email: pp8842973@gmail.com
-- ==========================================================================

CREATE DATABASE IF NOT EXISTS `Tech_learn`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `Tech_learn`;

-- 1. Table: Admin Configuration & Settings
CREATE TABLE IF NOT EXISTS `admin_config` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `institute_name` VARCHAR(150) DEFAULT 'Tech Learn Institute',
  `director_name` VARCHAR(100) DEFAULT 'Piyush',
  `whatsapp_number` VARCHAR(20) DEFAULT '8974003523',
  `email_id` VARCHAR(150) DEFAULT 'pp8842973@gmail.com',
  `admin_passcode` VARCHAR(20) DEFAULT '7742',
  `alt_passcode` VARCHAR(20) DEFAULT '8974',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `admin_config` (`institute_name`, `director_name`, `whatsapp_number`, `email_id`, `admin_passcode`, `alt_passcode`)
VALUES ('Tech Learn Institute', 'Piyush', '8974003523', 'pp8842973@gmail.com', '7742', '8974')
ON DUPLICATE KEY UPDATE `whatsapp_number` = '8974003523', `email_id` = 'pp8842973@gmail.com';

-- 2. Table: Courses & Official Fee Structure
CREATE TABLE IF NOT EXISTS `courses` (
  `course_id` VARCHAR(50) PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `duration` VARCHAR(100) NOT NULL,
  `fee_amount` INT NOT NULL,
  `fee_display` VARCHAR(50) NOT NULL,
  `mode` VARCHAR(100) DEFAULT '100% Online Class with Flexible Timings',
  `status` ENUM('Active', 'Inactive') DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `courses` (`course_id`, `title`, `category`, `duration`, `fee_amount`, `fee_display`, `mode`)
VALUES
('class-11-ip', 'Class 11 Informatics Practices (IP Code 065)', 'cbse', 'Online (Flexible Timings)', 0, 'Admissions Open', '100% Online Class with Flexible Timings'),
('class-12-ip', 'Class 12 Informatics Practices (IP Code 065)', 'cbse', 'Online (Flexible Timings)', 0, 'Admissions Open', '100% Online Class with Flexible Timings'),
('linux-fundamentals', 'Linux Administration & Shell Scripting', 'individual', '2 months', 0, 'Admissions Open', '100% Online Class with Flexible Timings'),
('computer-networking', 'Computer Networking & Protocols', 'individual', '2 months', 0, 'Admissions Open', '100% Online Class with Flexible Timings'),
('python-mastery', 'Python Programming (Zero to Hero)', 'individual', '2 months', 0, 'Admissions Open', '100% Online Class with Flexible Timings'),
('sql-database', 'SQL & Relational Databases Mastery', 'individual', '1.5 months', 0, 'Admissions Open', '100% Online Class with Flexible Timings'),
('power-bi', 'Power BI Masterclass', 'individual', '1.5 months', 0, 'Admissions Open', '100% Online Class with Flexible Timings'),
('machine-learning', 'Machine Learning Specialization', 'individual', '3 months', 0, 'Admissions Open', '100% Online Class with Flexible Timings'),
('data-science-individual', 'Data Science & EDA', 'individual', '4 months', 0, 'Admissions Open', '100% Online Class with Flexible Timings'),
('data-science-full', 'Data Science Full Course (Python+SQL+PowerBI+ML+DS)', 'career-track', '6–8 months', 0, 'Admissions Open', '100% Online Class with Flexible Timings')
ON DUPLICATE KEY UPDATE `fee_amount` = VALUES(`fee_amount`), `fee_display` = VALUES(`fee_display`);

-- 3. Table: Student Accounts (Unique Login, Password & Course Access Grants)
CREATE TABLE IF NOT EXISTS `students` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `username` VARCHAR(100) UNIQUE NOT NULL,
  `email` VARCHAR(150) UNIQUE NOT NULL,
  `phone_number` VARCHAR(20) DEFAULT '8974003523',
  `password` VARCHAR(100) NOT NULL,
  `is_access_granted` TINYINT(1) DEFAULT 0,
  `unlocked_courses` JSON DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `students` (`id`, `name`, `username`, `email`, `phone_number`, `password`, `is_access_granted`, `unlocked_courses`)
VALUES
('std-101', 'Aarav Sharma', 'aarav12', 'aarav@gmail.com', '8974003523', 'password123', 1, '["class-12-ip", "python-mastery"]'),
('std-102', 'Priya Verma', 'priya', 'priya@gmail.com', '8974003523', 'password123', 1, '["data-science-full"]'),
('std-103', 'Rohan Gupta', 'rohan', 'rohan@gmail.com', '8974003523', 'password123', 0, '["class-11-ip"]')
ON DUPLICATE KEY UPDATE `password` = VALUES(`password`), `is_access_granted` = VALUES(`is_access_granted`);

-- 4. Table: Student Admissions & Seat Reservations
CREATE TABLE IF NOT EXISTS `admissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_name` VARCHAR(150) NOT NULL,
  `phone_number` VARCHAR(20) NOT NULL,
  `email_id` VARCHAR(150) NOT NULL,
  `course_name` VARCHAR(150) NOT NULL,
  `timing_slot` VARCHAR(100) DEFAULT 'Online Class (Flexible Timing)',
  `fee_amount` VARCHAR(50) DEFAULT NULL,
  `message` TEXT DEFAULT NULL,
  `status` ENUM('Pending', 'Confirmed', 'Contacted') DEFAULT 'Pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `admissions` (`student_name`, `phone_number`, `email_id`, `course_name`, `timing_slot`, `fee_amount`, `status`)
VALUES 
('Sample Student', '8974003523', 'pp8842973@gmail.com', 'Class 12 IP', 'Online Class (Flexible Timing)', 'Flexible Online Batch', 'Confirmed'),
('Demo Learner', '8974003523', 'pp8842973@gmail.com', 'Data Science Full Course', 'Online Class (Flexible Timing)', 'Flexible Online Batch', 'Confirmed');

-- 5. Table: Free Demo Class Bookings
CREATE TABLE IF NOT EXISTS `demo_bookings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_name` VARCHAR(150) NOT NULL,
  `phone_number` VARCHAR(20) NOT NULL,
  `email_id` VARCHAR(150) NOT NULL,
  `course_name` VARCHAR(150) NOT NULL,
  `preferred_slot` VARCHAR(100) DEFAULT 'Online Class (Flexible Timing)',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Table: Contact Messages & Inquiries
CREATE TABLE IF NOT EXISTS `contact_inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `course` VARCHAR(150) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Verification Queries
SELECT 'Database Tech_learn initialized successfully!' AS Status;
SELECT * FROM `admin_config`;
SELECT * FROM `courses`;
SELECT * FROM `students`;
