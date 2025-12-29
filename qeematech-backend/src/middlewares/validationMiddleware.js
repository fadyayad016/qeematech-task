const AppError = require('../utils/AppError');

exports.validateRegister = (req, res, next) => {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
        return next(new AppError('Please provide email, password, and full name', 400));
    }

    if (!email.includes('@')) {
        return next(new AppError('Invalid email format', 400));
    }

    if (password.length < 6) {
        return next(new AppError('Password must be at least 6 characters long', 400));
    }

    next();
};

exports.validateLogin = (req, res, next) => {
    const { email, password } = req.body;

   if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    if (!email.includes('@')) {
        return next(new AppError('Please provide a valid email address', 400));
    }

    next();
};