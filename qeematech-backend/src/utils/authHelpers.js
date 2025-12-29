const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.hashPassword = async (password) => {
    return await bcrypt.hash(password, 12);
};

exports.comparePasswords = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword);
};

exports.generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
};