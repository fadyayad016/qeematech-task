const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to MySQL database via Prisma');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = prisma;
