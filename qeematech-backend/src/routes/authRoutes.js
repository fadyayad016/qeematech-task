const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin, validateRegister} = require('../middlewares/validationMiddleware');

const upload = require('../middlewares/uploadMiddleware'); 

router.post(
    '/register', 
    upload.single('profileImage'), 
    validateRegister,             
    authController.register      
);
router.post('/login', validateLogin, authController.login);
router.post('/logout', authController.logout);

module.exports = router;