const prisma = require('../config/db');

class FavoriteService {
    async toggleFavorite(studentId, lessonId) {
        const existingFavorite = await prisma.favorite.findUnique({
            where: {
                studentId_lessonId: {
                    studentId: Number(studentId),
                    lessonId: Number(lessonId)
                }
            }
        });

        if (existingFavorite) {
            await prisma.favorite.delete({
                where: { id: existingFavorite.id }
            });
            return { action: 'removed' };
        } else {
            await prisma.favorite.create({
                data: {
                    studentId: Number(studentId),
                    lessonId: Number(lessonId)
                }
            });
            return { action: 'added' };
        }
    }

    async getStudentFavorites(studentId) {
        return await prisma.favorite.findMany({
            where: { studentId: Number(studentId) },
            include: {
                lesson: true 
            }
        });
    }
}

module.exports = new FavoriteService();