# UAlly - Task Management Application

A full-stack task management application built with React and Node.js, designed to help users organize their tasks, lists, and categories efficiently.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Screenshots](#screenshots)
- [Repository Docs](#repository-docs)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authors](#authors)

## 🎯 Overview

UAlly is a comprehensive to-do list application that allows users to:
- Manage personal and university-related tasks
- Organize tasks into lists and categories
- Track progress with an intuitive interface
- Secure user authentication and profile management

## ✨ Features

- **User Authentication**: Secure registration and login system
- **Task Management**: Create, update, and delete tasks
- **List Organization**: Group tasks into custom lists
- **Category System**: Categorize tasks (Personal, University, etc.)
- **Email Integration**: Email notifications via Nodemailer
- **Responsive UI**: Modern, Bootstrap-based interface
- **Profile Management**: User profile customization

## 🛠 Tech Stack

### Frontend
- **React** 18.2.0 - UI framework
- **TypeScript** - Type-safe development
- **React Bootstrap** - UI components
- **Axios** - HTTP client
- **MDB React UI Kit** - Additional UI components

### Backend
- **Node.js** with **Express** - Server framework
- **TypeScript** - Type-safe development
- **SQLite3** - Database
- **Nodemailer** - Email service
- **Nodemon** - Development hot-reload

## 📁 Project Structure

```
UAlly/
├── backend/                # Backend server
│   ├── src/
│   │   ├── main.ts        # Main server file with API endpoints
│   │   ├── serverInfo.ts  # Server configuration
│   │   └── tables/        # Database models
│   │       ├── Users.ts   # User model
│   │       ├── Tasks.ts   # Task model
│   │       ├── Lists.ts   # List model
│   │       └── Categories.ts # Category model
│   ├── db/                # SQLite database
│   └── build/             # Compiled JavaScript
│
├── frontend/              # React frontend
│   ├── src/
│   │   ├── App.tsx        # Main app component
│   │   ├── components/    # React components
│   │   │   ├── BaseLayout.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── SideBar.tsx
│   │   │   ├── Task.tsx
│   │   │   └── ...
│   │   ├── views/         # Page views
│   │   │   ├── LoginView.tsx
│   │   │   ├── RegisterView.tsx
│   │   │   ├── ProjectView.tsx
│   │   │   └── ...
│   │   └── assets/        # Images and styles
│   └── build/             # Production build
│
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

**About SQLite**
- The app uses SQLite via the Node.js `sqlite3` package (no separate server).
- The `sqlite3` CLI is optional and only needed if you want to run SQL files manually.

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd UAlly
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Server Settings**
   
   Create a `serverInfo.json` file in `backend/server/` (use the example below):
   ```json
   {
     "smtp": {
       "host": "your-smtp-host",
       "port": 587,
       "auth": {
         "user": "your-email@example.com",
         "pass": "your-password"
       }
     }
   }
   ```

   You can copy the template:
   ```bash
   cp backend/server/serverInfo.example.json backend/server/serverInfo.json
   ```
   On Windows PowerShell:
   ```powershell
   Copy-Item backend/server/serverInfo.example.json backend/server/serverInfo.json
   ```

5. **Initialize Database**
   
   Run the provided initializer once to create tables:
   ```bash
   cd backend
   node scripts/init-db.js
   ```

## 📘 Repository Docs

- Frontend details: see `frontend/README.md`
- Backend details: see `backend/README.md`

## 🖼 Screenshots

- [Welcome screen](docs/Welcome1.png)
- [Dashboard](docs/Central1.png)
- [Inside a project](docs/Inside-Work.png)
- [Edit profile](docs/Edit-Profile1.png)

## 🏃 Running the Application

### Development Mode

```bash
# Backend
cd backend
npm install
node scripts/init-db.js
npm run dev
```

```bash
# Frontend (new terminal)
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000` and calls the backend at `http://localhost:8080`.

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will run with hot-reload enabled and will restart on any TypeScript file changes.

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`

### Production Mode

1. **Build the Backend**
   ```bash
   cd backend
   npm run compile
   ```

2. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   ```
   The production build will be created in the `frontend/build/` directory.

## 🔌 API Endpoints

The backend provides RESTful API endpoints for:

### User Management
- `POST /registerUser` - Register a new user
- `POST /updateUserData` - Update user information
- `GET /loginUser/:data` - User login (`email_password` in the path)
- `GET /getUserById/:id` - Get user by ID
- `GET /getUserByName/:name` - Get users by name
- `GET /getUserByEmail/:email` - Get user by email
- `DELETE /deleteAccount/:id` - Delete user account

### Task Management
- `GET /getTask/:taskID` - Get a task by ID
- `GET /getTasks/:listID` - Get tasks by list ID
- `POST /createTask` - Create a new task
- `POST /updateTaskState` - Update task state
- `POST /updateTask` - Update task details
- `DELETE /deleteTask/:taskID` - Delete a task

### List Management
- `GET /getLists/:userID` - Get lists by user ID
- `GET /getList/:listID` - Get a list by ID
- `POST /createList` - Create a new list
- `POST /editList` - Update list details
- `DELETE /deleteList/:listID` - Delete a list
- `DELETE /deleteLists/:categoryID` - Delete lists by category ID

### Category Management
- `GET /getCategories/:userID` - Get categories by user ID
- `GET /getCategory/:id` - Get a category by ID
- `POST /createCategory` - Create a new category
- `POST /updateCategory` - Update category details
- `DELETE /deleteCategory/:categoryID` - Delete a category

## 👥 Authors

- Helena
- Rui
- Vasco

## 📄 License

ISC

## 🤝 Contributing

This is an academic project. For any questions or suggestions, please contact the authors.

---

**Note**: Make sure to configure your SMTP settings in `backend/server/serverInfo.json` before running the application to enable email functionality.
