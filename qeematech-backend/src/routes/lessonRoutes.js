const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', protect, lessonController.getLessons);

router.post('/', 
    protect, 
    restrictTo('ADMIN'), 
    upload.single('image'), 
    lessonController.createLesson
);

router.route('/:id')
    .patch(
        protect, 
        restrictTo('ADMIN'), 
        upload.single('image'), 
        lessonController.updateLesson
    )
    .delete(
        protect, 
        restrictTo('ADMIN'), 
        lessonController.deleteLesson
    );

module.exports = router;