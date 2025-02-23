# Task Management Application

This is a full-stack task management application built with a React frontend, an Express backend, and a PostgreSQL database. It allows users to create, update, delete, and view tasks.

---

## Table of Contents
1. [Database Setup](#database-setup)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Testing](#testing)
5. [Salary Expectations](#salary-expectations)

---

## Database Setup

### 1. **Install PostgreSQL**
   - Ensure PostgreSQL is installed on your system. You can download it from [here](https://www.postgresql.org/download/).

### 2. **Create a Database**
   - Open your PostgreSQL terminal or GUI tool (e.g., pgAdmin).
   - Create a new database:
     ```sql
     CREATE DATABASE task_management;
     ```

### 3. **Run Migrations**
    - Use the PostgreSQL CLI or a GUI tool (e.g., pgAdmin) to run the following SQL scripts to create the `users` and `tasks` tables.
#### Create the `users` Table
   ```sql
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       username VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL,
   );
   ```
#### Create the `tasks` Table
   ```sql
   CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    iscomplete BOOLEAN NOT NULL DEFAULT FALSE,
    userid INTEGER REFERENCES users(id) ON DELETE CASCADE,
   );
   ```

### 4. **Environment Variables**
   - Create a `.env` file in the `backend` directory with the following variables:
     ```env
     DB_USER=your_db_username
     DB_HOST=localhost
     DB_NAME=task_management
     DB_PORT=5432
     DB_PASSWORD=your_db_password
     JWT_SECRET=your_jwt_secret_key
     ```

---

## Backend Setup

### 1. **Install Dependencies**
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```

### 2. **Run the Backend**
   - Start the backend server:
     ```bash
     npm run dev
     ```
   - The backend will run on `http://localhost:5002`.

---

## Frontend Setup

### 1. **Install Dependencies**
   - Navigate to the `frontend` directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```

### 2. **Run the Frontend**
   - Start the frontend development server:
     ```bash
     npm start
     ```
   - The frontend will run on `http://localhost:3000`.

---

## Testing



###  **Manual Testing**
   - Use tools like [Postman](https://www.postman.com/) to manually test the backend API endpoints.
   - Test the frontend by interacting with the UI in the browser.

---

## Salary Expectations

- **Expected Salary**: $4500 per month.

### **Video Demo**

- [Video Demo](https://drive.google.com/file/d/1CmfX77QrrqEd25_xC8q9lBEF8iBQbfsj/view?usp=drive_link)

---

## Notes

- Ensure all environment variables are correctly set up before running the application.
- The backend and frontend must be running simultaneously for the application to work.


---
