const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.post('/toggle', favoriteController.toggleFavorite);
router.get('/', favoriteController.getMyFavorites);

module.exports = router;