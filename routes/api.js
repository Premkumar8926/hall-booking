const express = require('express');
const router = express.Router();

// In-memory data storage (arrays to simulate a database)
let rooms = [];
let bookings = [];
let bookingId = 1;

// Endpoint 1: Create a Room
router.post('/rooms', (req, res) => {
    const { name, seats, amenities, price } = req.body;

    if (!name || !seats || !amenities || !price) {
        return res.status(400).send('Missing required fields: name, seats, amenities, or price');
    }

    const newRoom = { id: rooms.length + 1, name, seats, amenities, price, bookings: [] };
    rooms.push(newRoom);
    res.status(201).send('Room created successfully');
});

// Endpoint 2: Book a Room
router.post('/bookings', (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;

    // Check if room exists
    const room = rooms.find(r => r.id === roomId);
    if (!room) return res.status(404).send('Room not found');

    // Check for room availability on the given date and time
    const isBooked = room.bookings.some(
        (b) => b.date === date && (
            (b.startTime <= startTime && b.endTime >= startTime) ||
            (b.startTime <= endTime && b.endTime >= endTime)
        )
    );

    if (isBooked) {
        return res.status(400).send('Room is already booked for the selected time slot');
    }

    const booking = {
        id: bookingId++,
        customerName,
        date,
        startTime,
        endTime,
        roomId,
        bookingDate: new Date(),
        bookingStatus: 'Confirmed'
    };

    room.bookings.push(booking);
    bookings.push(booking);
    res.status(201).send('Room booked successfully');
});

// Endpoint 3: List all Rooms with Booked Data
router.get('/rooms', (req, res) => {
    const roomsData = rooms.map(room => ({
        name: room.name,
        bookedData: room.bookings.map(b => ({
            customerName: b.customerName,
            date: b.date,
            startTime: b.startTime,
            endTime: b.endTime
        }))
    }));
    res.send(roomsData);
});

// Endpoint 4: List all Customers with Booked Data
router.get('/customers', (req, res) => {
    const customersData = bookings.map(b => ({
        customerName: b.customerName,
        roomName: rooms.find(r => r.id === b.roomId).name,
        date: b.date,
        startTime: b.startTime,
        endTime: b.endTime
    }));
    res.send(customersData);
});

// Endpoint 5: List how many times a customer has booked rooms
router.get('/customer-bookings/:customerName', (req, res) => {
    const { customerName } = req.params;
    const customerBookings = bookings.filter(b => b.customerName === customerName);
    
    const customerData = customerBookings.map(b => ({
        bookingId: b.id,
        roomName: rooms.find(r => r.id === b.roomId).name,
        date: b.date,
        startTime: b.startTime,
        endTime: b.endTime,
        bookingDate: b.bookingDate,
        bookingStatus: b.bookingStatus
    }));

    res.send({ customerName, bookings: customerData });
});

module.exports = router;
