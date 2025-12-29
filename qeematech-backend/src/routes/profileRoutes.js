const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { protect,restrictTo } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.use(protect);

router.get('/me', profileController.getMe);
router.patch('/update-me', protect, upload.single('image'), profileController.updateMyProfile);
router.get('/school', profileController.getSchoolDetails);
router.patch('/school/update',restrictTo('ADMIN'),upload.single('logo'), profileController.updateSchool);



 
module.exports = router;