-- Database Name:
CREATE DATABASE gradleTest;

USE gradleTest;

GRANT ALL PRIVILEGES ON gradleTest.* TO 'testUser'@'localhost';

-- Users Table Structure:
CREATE TABLE users(
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(user_id)
);
