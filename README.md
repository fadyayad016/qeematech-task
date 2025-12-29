# Qeematech Mid-Level Full-Stack Task - Educational Platform
**Candidate:** Fady Ayad AbdelMalak
**Role:** Full Stack Developer (Node.js & React)

## 🚀 Project Overview
A comprehensive educational platform consisting of two main portals:
1. **Student Portal:** Features lesson browsing, advanced search, favorite systems, and personalized profile management with image uploads.
2. **School Admin Dashboard:** Features real-time statistics, complete student directory (CRUD) with pagination, and lesson management with media uploads.

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js, Prisma ORM, MySQL, JWT (HTTP-Only Cookies).
- **Frontend:** React (Vite), Tailwind CSS, React Context API (Global State), Axios.
- **File Handling:** Multer (for profile and lesson images).

---

## ✨ Key Features
- **Global State Management:** Implemented via **React Context API** to ensure a seamless SPA experience without page refreshes during auth or profile updates.
- **Role-Based Access Control (RBAC):** Secured routes and API endpoints for Admins and Students.
- **Server-Side Pagination & Search:** Optimized data fetching for both students and lessons lists.
- **Dynamic Admin Stats:** Real-time counters for Students, Lessons, and Favorites.

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js 
- MySQL Server

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd qeematech-backend
   npm install


  2. Create a .env file in the backend root:
   DATABASE_URL=""
JWT_SECRET="your_secure_random_secret"
PORT=5000
FRONTEND_URL="http://localhost:5173"

3. Run Prisma migrations:
npx prisma migrate dev --name init
npx prisma generate

4. Start the server:
npm run dev3. Frontend Setup
### 3. frontend Setup
1. Navigate to the frontend directory:
cd qeematech-frontend
npm install

2. Start the development server:
npm run dev
