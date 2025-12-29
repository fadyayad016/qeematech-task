const prisma = require('../config/db');

class LessonService {
   async getAllLessons(query) {
    const { page = 1, limit = 10, search = '' } = query;
    const skip = (page - 1) * limit;

    const where = search ? {
        OR: [
            { name: { contains: search } },
            { description: { contains: search } }
        ]
    } : {};

    const [lessons, total] = await Promise.all([
        prisma.lesson.findMany({
            where,
            skip: Number(skip),
            take: Number(limit),
            orderBy: { createdAt: 'desc' }
        }),
        prisma.lesson.count({ where })
    ]);

    const formattedLessons = lessons.map(lesson => ({
        ...lesson,
        image: lesson.image ? lesson.image : '/uploads/default-lesson.png'
    }));

    return {
        lessons: formattedLessons,
        pagination: {
            total,
            page: Number(page),
            pages: Math.ceil(total / (Number(limit) || 10))
        }
    };
}
    async createLesson(data) {
        return await prisma.lesson.create({ data });
    }

    async updateLesson(id, data) {
        return await prisma.lesson.update({
            where: { id: Number(id) },
            data
        });
    }

    async deleteLesson(id) {
        return await prisma.lesson.delete({
            where: { id: Number(id) },
            
        });
    }
}

module.exports = new LessonService();