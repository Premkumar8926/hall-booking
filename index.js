const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const apiRoutes = require('./routes/api');

// Body-parser middleware should be before routes
app.use(express.json()); // Middleware to parse JSON data

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Hall Booking API');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
