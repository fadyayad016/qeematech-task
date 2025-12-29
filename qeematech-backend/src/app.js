const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./middlewares/errorMiddleware');
const AppError = require('./utils/AppError');
const path = require('path');
const app = express();

// 1. Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const lessonRoutes = require('./routes/lessonRoutes');
app.use('/api/lessons', lessonRoutes);

const favoriteRoutes= require('./routes/favoriteRoutes')
app.use('/api/favorites', favoriteRoutes);

app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const adminRouter = require('./routes/adminRoutes');
app.use('/api/admin', adminRouter);



// 2. Sample Route for Testing
app.get('/api/test', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Backend is running perfectly!'
    });
});

// 3. 404 Handler 
app.all(/(.*)/, (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 4. Global Error Handler 
app.use(globalErrorHandler);

module.exports = app;