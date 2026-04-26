# Smart Student Placement Portal

A full-stack web application built using MongoDB, Express.js, Node.js, HTML, CSS, and JavaScript. This project helps students apply for jobs, companies post vacancies, and manages placement activities efficiently.

---

## Features

### Student Module
- Student Registration
- Student Login
- View Available Jobs
- Apply for Jobs
- View Applied Jobs

### Company Module
- Company Registration
- Company Login
- Post New Jobs
- Manage Job Listings

### Database
- MongoDB used for storing:
  - Students
  - Companies
  - Jobs
  - Applications

---

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JWT (JSON Web Token)

---

## Project Structure

smart-student-placement-portal/

├── frontend/  
│   ├── index.html  
│   ├── css/style.css  
│   ├── js/  
│   └── pages/  

├── backend/  
│   ├── config/  
│   ├── models/  
│   ├── routes/  
│   ├── middleware/  
│   ├── server.js  
│   └── .env  

---

## Installation Steps

### 1. Clone Repository
git clone https://github.com/Ak-270704/smart-student-placement-portal.git

### 2. Go to Backend Folder
cd backend

### 3. Install Dependencies
npm install

### 4. Create .env File
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/placementPortal
JWT_SECRET=placement_secret_key

### 5. Start Backend Server
npm run dev

### 6. Open Frontend
Open:
frontend/index.html
