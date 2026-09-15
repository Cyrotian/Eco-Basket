
# Eco-Basket Project

## Overview
Eco-Basket is a sustainability-focused web application designed with a modern front-end and a robust back-end, aiming to provide an intuitive user experience and reliable functionality. This document outlines the setup process, recent updates, and guidelines for contributing to the project.

---

## Recent Updates (Release Notes)

### **Frontend Updates**
- **Improved Design**: Reduced the number of colors and implemented a cohesive color scheme for better aesthetics.
- **Updated Logo**: Replaced the logo to align with the refreshed design.
- **Minor UI Enhancements**: Polished various elements for a smoother user experience.

### **Backend Updates**
- **Code Refactoring**: Incorporated **Lombok** to improve code readability and maintainability.
- **Database Management**: Integrated **Flyway** for managing database migrations. Migration scripts are located at `Resources -> db -> migrations`. Consult with Micheal for any required changes.
- **Database Setup**:
  - MySQL 8 is required for this project.
  - The GitHub version omits the database password for security purposes.
  - After installing MySQL, update the `application.properties` file with your credentials.
  - Name the database `eco-basket` and start the Spring Boot application to automatically create the required tables and schema.
---

## Setup Instructions

### **Prerequisites**
1. **Java 17+**: Ensure Java is installed and added to your system's PATH.
2. **MySQL 8**: Download and configure MySQL.
3. **Lombok**: Verify that Lombok is set up in your Eclipse IDE.

### **Database Configuration**
1. Create a new MySQL database named `eco-basket`.
2. Update the `application.properties` file with the following:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/eco-basket
   spring.datasource.username=<your-username>
   spring.datasource.password=<your-password>
   ```
3. Run the application. Spring Boot will automatically execute Flyway migration scripts to set up the database schema.

---

## Development Guidelines

### **Database Changes**
- Use Flyway to manage database migrations.
- Add new migration scripts to the `Resources -> db -> migrations` folder and test them thoroughly.

### **Code Standards**
- Follow clean coding practices.
- Make use of Lombok annotations where applicable to reduce boilerplate code.

### **Contributing**
- Fork the repository and create a branch for your changes.
- Test all changes locally before submitting a pull request.
- Include relevant documentation updates if your changes affect the setup or functionality.

---

## Known Issues and Limitations
- The GitHub version does not include a database password for security reasons.
- Database setup requires manual password configuration in `application.properties`.

---
