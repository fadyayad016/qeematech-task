const prisma = require('../config/db');
const { hashPassword, generateToken,comparePasswords } = require('../utils/authHelpers');
const AppError = require('../utils/AppError');

class AuthService {

    async registerUser(userData) {
        const existingUser = await prisma.user.findUnique({
            where: { email: userData.email }
        });

        if (existingUser) {
            throw new AppError('Email already exists', 400);
        }

        const hashedPassword = await hashPassword(userData.password);

        const newUser = await prisma.user.create({
            data: {
                email: userData.email,
                password: hashedPassword,
                fullName: userData.fullName,
                role:  'STUDENT' ,

                class: userData.class,
                academicYear: userData.academicYear,
                phone: userData.phone,
                profileImage: userData.profileImage 
            },
           
        });

        const token = generateToken(newUser.id, newUser.role);

        return { user: newUser, token };
    }


    async loginUser(email, password) {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user || !(await comparePasswords(password, user.password))) {
        throw new AppError('Incorrect email or password', 401);
    }

    const token = generateToken(user.id, user.role);

    return { user, token };
}

}

module.exports = new AuthService();