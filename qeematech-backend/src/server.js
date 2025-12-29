require('dotenv').config(); 

const app = require('./app');
const prisma = require('./config/db'); 

const PORT = process.env.PORT || 5000;

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});

const server = app.listen(PORT, () => {
    console.log(`
    ✅ Server is running in ${process.env.NODE_ENV || 'development'} mode
    🚀 Port: ${PORT}
    🔗 URL: http://localhost:${PORT}
    `);
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});