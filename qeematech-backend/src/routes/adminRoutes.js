const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

router.use(protect);
router.use(restrictTo('ADMIN'));

router.get('/stats', adminController.getStats);
router.get('/students', adminController.getAllStudents);
router.delete('/students/:id', adminController.deleteStudent);
module.exports = router;