const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const AppError = require('../utils/AppError');

exports.protect = async (req, res, next) => {
    try {
        let token;

        if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return next(new AppError('You are not logged in! Please log in to get access.', 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const currentUser = await prisma.user.findUnique({
            where: { id: decoded.id }
        });

        if (!currentUser) {
            return next(new AppError('The user belonging to this token no longer exists.', 401));
        }

        req.user = currentUser;
        next();
    } catch (error) {
        next(new AppError('Invalid token. Please log in again!', 401));
    }
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles = ['ADMIN']
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};