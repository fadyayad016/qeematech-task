const prisma = require('../config/db');

class ProfileService {
    async updateStudentProfile(userId, data) {
        return await prisma.user.update({
            where: { id: Number(userId) },
            data: {
                fullName: data.fullName,
                class: data.class,
                academicYear: data.academicYear,
                phone: data.phone,
                profileImage: data.profileImage 
            }
        });
    }

    async updateSchoolProfile(data) {
        
        return await prisma.school.upsert({
            where: { id: 1 },
            update: {
                name: data.schoolName,
                phone: data.phone,
                logo: data.schoolLogo 
            },
            create: {
                id: 1,
                name: data.schoolName,
                phone: data.phone,
                logo: data.schoolLogo 
            }
        });
    }

    async getSchoolInfo() {
        return await prisma.school.findUnique({
            where: { id: 1 }
        });
    }

    async getProfile(userId) {
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) }
        });
        if (user) user.password = undefined; 
        return user;
    }
}

module.exports = new ProfileService();