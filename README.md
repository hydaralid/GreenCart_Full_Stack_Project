# GreenCart - Full Stack Website

## Overview
GreenCart is a full-stack e-commerce web application designed for an eco-friendly shopping experience. Built using **React.js** for the frontend, **Spring Boot** for the backend, and **PostgreSQL** as the database, this platform provides users with a seamless interface to browse and purchase sustainable products.

## Tech Stack
### Frontend
- **React.js**: Single-page application (SPA) for a dynamic user experience.
- **Bootstrap**: Responsive UI components.
- **React Router**: Navigation and routing.
- **Axios**: API communication.
- **Redux (Optional)**: State management.

### Backend
- **Spring Boot**: RESTful API development.
- **Spring Security**: Authentication & authorization.
- **Spring Data JPA**: ORM for database interaction.
- **JWT Authentication**: Secure user authentication.

### Database
- **PostgreSQL**: Relational database for storing product and user data.
- **Flyway (Optional)**: Database migration management.

---

## Features
### User Features
- User registration & authentication (JWT-based).
- Browse products categorized by eco-friendly tags.
- Add items to cart and checkout.
- Order history tracking.

### Admin Features
- Add, edit, or remove products.
- View orders and manage users.
- Sales analytics dashboard.

---

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- React.js & npm (for frontend)
- Java 17+ & Maven (for backend)
- PostgreSQL (for database)

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/hydaralid/GreenCart_Full_Stack_Project.git
   ```
2. Navigate to the backend folder:
   ```sh
   cd GreenCart_Backend
   ```
3. Configure **application.properties**:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/greencart_db
   spring.datasource.username=your_db_user
   spring.datasource.password=your_db_password
   ```
4. Build and run the Spring Boot application:
   ```sh
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd GreenCart_Frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

---

## API Endpoints
### User Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | /register/signup | Register a new user |
| POST   | /register/login  | Authenticate user |

### Product Management
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | /fetch | Get all products |
| POST   | /add | Add a new product (Admin) |

### Order Management
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | /orders/add | Create an order |
| GET    | /orders/fetch | Get user orders |

---

## Contributions
Contributions are welcome! Feel free to fork this repository and submit pull requests.


