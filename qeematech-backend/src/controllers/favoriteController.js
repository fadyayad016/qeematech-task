const favoriteService = require('../services/favoriteService');

exports.toggleFavorite = async (req, res, next) => {
    try {
        const { lessonId } = req.body;
        const studentId = req.user.id; 

        const result = await favoriteService.toggleFavorite(studentId, lessonId);
        
        res.status(200).json({
            status: 'success',
            message: `Lesson ${result.action} successfully`
        });
    } catch (error) {
        next(error);
    }
};

exports.getMyFavorites = async (req, res, next) => {
    try {
        const favorites = await favoriteService.getStudentFavorites(req.user.id);
        res.status(200).json({
            status: 'success',
            data: { favorites }
        });
    } catch (error) {
        next(error);
    }
};