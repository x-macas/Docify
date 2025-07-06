# 🏥 Docifyy – Hospital Management System

## Overview

**Docifyy** is a robust MERN stack-based hospital management solution designed to streamline healthcare operations. It supports three roles: **User**, **Doctor**, and **Admin**, each with dedicated portals and functionalities. Users can book appointments with doctors by department, while admins and doctors manage schedules, departments, and patients. **Razorpay** integration enables seamless payment processing.

---

## Frontend

### Features

- **Role-Based Access**: Supports User, Doctor, and Admin interfaces with custom dashboards.
- **Appointment Booking**: Users can schedule appointments with available doctors by department.
- **Doctor Management**: Admins can add and manage doctors, their departments, and availability.
- **Payment Gateway**: Integrated with Razorpay for secure and fast online payments.
- **Responsive UI**: Built using React.js and Tailwind CSS for a clean, mobile-friendly design.

#### Dashboard Statistics

- Appointments Booked  
- Active Doctors  
- Departments  
- Payment Success Rate  

---

## Installation and Usage

### Clone the repository

```bash
git clone https://github.com/<your-username>/docifyy
cd docifyy

Install dependencies

# Backend
cd backend
npm install

# Frontend - User side
cd ../frontend
npm install

# Frontend - Admin/Doctor side
cd ../admin
npm install

Run the application

# Backend
cd backend
npm start

# User Frontend
cd ../frontend
npm run dev

# Admin/Doctor Frontend
cd ../admin
npm run dev

Demo
🌐 Live URLs

    User Portal: https://docifyy.netlify.app

    Admin/Doctor Portal: https://docifyadmin.netlify.app

🔐 Login Credentials
👨‍⚕️ Doctor

Email: emily@gmail.com  
Password: 12345678

🛡️ Admin

Email: ninad@gmail.com  
Password: 12345

Backend
Features

    Express.js API: Handles appointments, users, doctors, admin, and Razorpay integration.

    JWT Authentication: Secure role-based access using JSON Web Tokens.

    MongoDB Atlas: Scalable NoSQL database for storing users, appointments, and roles.

    Error Handling: Unified error responses and validation.

API Structure

    /api/users

    /api/doctors

    /api/admin

    /api/appointments

    /api/payment

.env Example

PORT=4000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

Technical Architecture

    Frontend (User): React.js + Tailwind

    Frontend (Admin/Doctor): React.js + Tailwind

    Backend: Node.js + Express.js

    Database: MongoDB Atlas

    Authentication: JWT

    Payments: Razorpay

    Deployment: Netlify (Frontend), Railway/Render (Backend)

Contribution

Contributions are welcome! To contribute:

    Fork the repository

    Create a new branch:

git checkout -b feature-name

    Make your changes and commit:

git commit -m "Added feature XYZ"

    Push the branch:

git push origin feature-name

    Open a Pull Request

License

This project is licensed under the MIT License. See the LICENSE file for details.
Contact

For queries, feedback, or issues, please use the GitHub Issues section.


✅ Just paste this into your `README.md`, replace `<your-username>` with your actual GitHub username, and you're done!

Let me know if you want screenshot placeholders, badges, or GitHub Actions setup too.