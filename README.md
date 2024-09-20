## 🏢 Hall Booking App API
Welcome to the Hall Booking App API! This API enables easy management of hall reservations, allowing users to create rooms, book them, and view booking information for customers and rooms.
### 🔗 Key Features
1. Create Room
    -Endpoint: POST /api/rooms
    -Description: Creates a new room with specified details such as the number of seats available, amenities, and price per hour.
    -Request Body:
    -{
  "name": "Conference Hall A",
  "seats": 50,
  "amenities": ["Projector", "Wi-Fi", "Whiteboard"],
  "price": 100
    }

2. Book Room
    -Endpoint: POST /api/bookings
    -Description: Books a room for a customer for a specific date and time.
    -Request Body:
    -{
  "customerName": "John Doe",
  "date": "2024-09-19",
  "startTime": "09:00",
  "endTime": "12:00",
  "roomId": 1
    }
    
    -Note: The roomId must match an existing room.

3. List All Rooms with Booking Data
    -Endpoint: GET /api/rooms
    -Description: Retrieves a list of all rooms along with their booking details, including customer name, booking date, and timings.

4. List All Customers with Booking Data
    -Endpoint: GET /api/customers
    -Description: Retrieves a list of all customers who have made bookings, including their name, room details, and booking timings.

5. Details of Customer Booking History
    -Endpoint: GET /api/customer-bookings/:customerName
    -Description: Retrieves detailed booking information for a specific customer, including booking ID, room name, date, and booking status.
    -Example: /api/customer-bookings/JohnDoe

## 🚀 Technologies Used
    -Node.js: JavaScript runtime environment.
    -Express.js: Web application framework for Node.js to handle routing and server logic.

## 📝 Postman Documentation
    You can explore and test the API using the Postman documentation: https://documenter.getpostman.com/view/16859357/2sAXqs82yn

## ⚙️ How to Run the Project Locally
1. Clone the repository: git clone https://github.com/your-username/hall-booking-app.git
2. Navigate to the project directory: cd hall-booking-app
3. Install dependencies: npm install
4. Start the server: node index.js
5. Access the API using tools like Postman or a web browser: http://localhost:3000

## 📝 License
This project is licensed under the MIT License.