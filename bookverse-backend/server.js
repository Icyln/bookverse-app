const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const reviewsRoutes = require('./routes/reviews');
const booksRoutes = require('./routes/books');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/books', booksRoutes);

app.listen(8080, () => console.log('Backend running on port 8080'));
