const profileService = require('../services/profileService');

exports.getMe = async (req, res, next) => {
    try {
        const user = await profileService.getProfile(req.user.id);
        res.status(200).json({ status: 'success', data: { user } });
    } catch (error) {
        next(error);
    }
};

exports.updateMyProfile = async (req, res, next) => {
    try {

         if (req.file) {
            if (req.user.role === 'STUDENT') {
                req.body.profileImage = `/uploads/${req.file.filename}`;
            } else if (req.user.role === 'ADMIN') {
                req.body.schoolLogo = `/uploads/${req.file.filename}`;
            }
        }
        let updatedUser;
        if (req.user.role === 'STUDENT') {
            updatedUser = await profileService.updateStudentProfile(req.user.id, req.body);
        } else {
            updatedUser = await profileService.updateSchoolProfile(req.user.id, req.body);
        }

        res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully',
            data: { user: updatedUser }
        });
    } catch (error) {
        next(error);
    }
};




exports.getSchoolDetails = async (req, res, next) => {
    try {
        const school = await profileService.getSchoolInfo();
        res.status(200).json({ status: 'success', data: { school } });
    } catch (error) {
        next(error);
    }
};



exports.updateSchool = async (req, res, next) => {
    try {
        // معالجة لوجو المدرسة
        if (req.file) {
            req.body.schoolLogo = `/uploads/${req.file.filename}`;
        }

        // تحديث جدول School المنفصل
        const updatedSchool = await profileService.updateSchoolProfile(req.body);

        res.status(200).json({
            status: 'success',
            message: 'School profile updated successfully',
            data: { school: updatedSchool }
        });
    } catch (error) {
        next(error);
    }
};


