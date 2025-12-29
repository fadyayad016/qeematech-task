const authService = require('../services/authService');

exports.register = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.profileImage = `/uploads/${req.file.filename}`;
        }

        console.log('--- Final Data to Service ---');
        console.log(req.body); 

        const { user, token } = await authService.registerUser(req.body);

        res.cookie('token', token, {
            httpOnly: true, 
            secure: false, 
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/',
        });

        user.password = undefined;

        res.status(201).json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        next(error); 
    }
};



exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.loginUser(email, password);

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'

        });

        user.password = undefined;

        res.status(200).json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        next(error);
    }
};

exports.logout = (req, res) => {
    res.cookie('token', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};