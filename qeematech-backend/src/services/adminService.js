const prisma = require('../config/db');

class AdminService {
    async getDashboardStats() {
        const [studentCount, lessonCount, favoriteCount] = await Promise.all([
            prisma.user.count({ where: { role: 'STUDENT' } }), 
            prisma.lesson.count(), 
            prisma.favorite.count() 
        ]);

        return { studentCount, lessonCount, favoriteCount };
    }



async getAllStudents(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = query.search || '';

    const [students, total] = await Promise.all([
        prisma.user.findMany({
            where: {
                role: 'STUDENT',
                OR: [
                    { fullName: { contains: search } },
                    { email: { contains: search } }
                ]
            },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            select: { 
                id: true, fullName: true, email: true, phone: true, 
                class: true, academicYear: true, profileImage: true, createdAt: true
            }
        }),
        prisma.user.count({
            where: {
                role: 'STUDENT',
                OR: [
                    { fullName: { contains: search } },
                    { email: { contains: search } }
                ]
            }
        })
    ]);

    return { students, total, page, totalPages: Math.ceil(total / limit) };
}

async deleteStudent(id) {
    return await prisma.user.delete({ where: { id: Number(id) } });
}
}

module.exports = new AdminService();