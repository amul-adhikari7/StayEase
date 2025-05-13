# 🏨 Luxestay - Hotel Booking System (MERN Stack)

Luxestay is a **full-stack hotel booking system** built with the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. It allows users to register, browse hotels, book rooms, make payments, and manage reservations.

---

## 🚀 Features

✅ **User Authentication** - Register, Login, Logout, Profile Management  
✅ **Hotel & Room Management** - View, Add, Update, Delete hotels & rooms (Admin)  
✅ **Booking System** - Book hotel rooms with a user-friendly interface  
✅ **Payments Integration** - Supports online payments (Esewa, Khalti, Cash)  
✅ **Reviews & Ratings** - Users can leave reviews for hotels  
✅ **Admin Dashboard** - Manage users, bookings, and hotel listings  
✅ **Responsive UI** - Fully mobile-friendly and interactive UI  
✅ **Secure API** - JWT-based authentication and authorization  

---

## 🛠️ Tech Stack

### **Frontend (React.js)**
- React.js (Functional Components, Hooks)
- React Router for navigation
- Axios for API calls
- React Toastify for notifications

### **Backend (Node.js, Express.js)**
- Express.js for REST API
- JWT for authentication
- Bcrypt for password hashing

### **Database (MongoDB)**
- MongoDB Atlas (or local MongoDB)

---
📌 API Endpoints
User Authentication
POST    /api/users/register       # Register a new user
POST    /api/users/login          # Login a user
GET     /api/users/profile        # Get user profile
PUT     /api/users/profile        # Update user profile
POST    /api/users/verify         # Verify user account
POST    /api/users/forgot-password # Forgot password
POST    /api/users/reset-password  # Reset password
DELETE  /api/users/profile/delete # Delete user account

Hotel & Room APIs
GET     /api/hotels               # Get all hotels
GET     /api/hotels/:id           # Get a single hotel
POST    /api/hotels               # Add a new hotel (Admin)
PUT     /api/hotels/:id           # Update hotel (Admin)
DELETE  /api/hotels/:id           # Delete hotel (Admin)

GET     /api/rooms                # Get all rooms
GET     /api/rooms/:id            # Get a single room
POST    /api/rooms                # Add a new room (Admin)
PUT     /api/rooms/:id            # Update a room (Admin)
DELETE  /api/rooms/:id            # Delete a room (Admin)

Bookings APIs
POST    /api/bookings             # Create a booking
GET     /api/bookings/user        # Get user's bookings
GET     /api/bookings/:id         # Get booking details
GET     /api/bookings             # Get all bookings (Admin)
PUT     /api/bookings/:id         # Update booking status (Admin)
DELETE  /api/bookings/:id         # Cancel a booking

Payment APIs
POST    /api/payments             # Process payment

Reviews & Ratings
POST    /api/reviews              # Add a review for a hotel
GET     /api/reviews/hotels/:hotelId  # Get reviews for a hotel
DELETE  /api/reviews/:id          # Delete a review



