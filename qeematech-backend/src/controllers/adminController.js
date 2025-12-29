const adminService = require('../services/adminService');

exports.getStats = async (req, res, next) => {
    try {
        const stats = await adminService.getDashboardStats();
        
        res.status(200).json({
            status: 'success',
            data: stats
        });
    } catch (error) {
        next(error);
    }
};




exports.getAllStudents = async (req, res, next) => {
    try {
        const result = await adminService.getAllStudents(req.query);
        res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (error) {
        next(error);
    }
};


exports.deleteStudent = async (req, res, next) => {
    try {
        await adminService.deleteStudent(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};


