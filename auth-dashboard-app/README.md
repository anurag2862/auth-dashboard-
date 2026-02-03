# Auth Dashboard App - Frontend Developer Intern Assignment

A modern, full-stack web application featuring authentication, task management, and a beautiful responsive UI built with Next.js, TailwindCSS, and MongoDB.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-15.1-black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15.1 (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: TailwindCSS 4.0
- **HTTP Client**: Axios
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes (Express-style)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **API Versioning**: /api/v1/...

## ✨ Features

### Authentication
- ✅ User signup with validation
- ✅ User login with JWT tokens
- ✅ Password hashing (bcryptjs)
- ✅ Protected routes
- ✅ Persistent sessions

### Dashboard
- ✅ User profile display and editing
- ✅ Task statistics (Total, Pending, In Progress, Completed)
- ✅ Beautiful, responsive UI
- ✅ Logout functionality

### Task Management (CRUD)
- ✅ Create tasks with title, description, status, priority, due date
- ✅ Read all tasks (list view)
- ✅ Update tasks (edit modal)
- ✅ Delete tasks (with confirmation)
- ✅ Search tasks by title/description
- ✅ Filter by status (pending, in-progress, completed)
- ✅ Filter by priority (low, medium, high)

### Security & Quality
- ✅ Password hashing (no plain text)
- ✅ JWT validation on all protected routes
- ✅ Input validation (client + server)
- ✅ Clear error messages
- ✅ Loading states
- ✅ Success notifications
- ✅ Modular code structure
- ✅ Error handling and logging

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running locally OR MongoDB Atlas account

### Step 1: Clone the Repository
```bash
cd /Users/anurag/Desktop/internship/auth-dashboard-app
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Variables
The `.env.local` file is already created with default values:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/auth-dashboard

# JWT Secret (Change this in production!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production-12345

# App URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Important**: 
- For local MongoDB: Make sure MongoDB is running on port 27017
- For MongoDB Atlas: Replace `MONGODB_URI` with your Atlas connection string
- **Change `JWT_SECRET` in production!**

### Step 4: Start MongoDB (if using local)
```bash
# macOS with Homebrew
brew services start mongodb-community

# Or manually
mongod --dbpath /path/to/your/data/directory
```

### Step 5: Run the Application
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The app will be available at: **http://localhost:3000**

## 🎯 Demo Credentials

You can create a new account or use these demo credentials:

**Option 1: Create New Account**
- Go to http://localhost:3000/signup
- Fill in the form and create your account

**Option 2: Demo Account** (Create this first by signing up)
- Email: `demo@example.com`
- Password: `demo123`

## 📁 Project Structure

```
auth-dashboard-app/
├── app/
│   ├── api/v1/              # API routes
│   │   ├── auth/
│   │   │   ├── signup/      # POST /api/v1/auth/signup
│   │   │   └── login/       # POST /api/v1/auth/login
│   │   ├── me/              # GET/PUT /api/v1/me (profile)
│   │   └── tasks/           # CRUD endpoints for tasks
│   │       ├── route.js     # GET/POST /api/v1/tasks
│   │       └── [id]/        # GET/PUT/DELETE /api/v1/tasks/:id
│   ├── dashboard/           # Dashboard page
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── layout.js            # Root layout with AuthProvider
│   └── page.js              # Home page (redirects)
├── components/
│   └── ProtectedRoute.js    # Route protection wrapper
├── contexts/
│   └── AuthContext.js       # Authentication context
├── lib/
│   ├── api.js               # Axios API client
│   ├── auth.js              # JWT utilities
│   └── mongodb.js           # MongoDB connection
├── models/
│   ├── User.js              # User model
│   └── Task.js              # Task model
├── .env.local               # Environment variables
├── package.json             # Dependencies
└── README.md                # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login user

### Profile
- `GET /api/v1/me` - Get current user profile (protected)
- `PUT /api/v1/me` - Update current user profile (protected)

### Tasks
- `GET /api/v1/tasks` - Get all tasks for current user (protected)
  - Query params: `?status=pending&priority=high&search=keyword`
- `POST /api/v1/tasks` - Create new task (protected)
- `GET /api/v1/tasks/:id` - Get single task (protected)
- `PUT /api/v1/tasks/:id` - Update task (protected)
- `DELETE /api/v1/tasks/:id` - Delete task (protected)

See `postman_collection.json` for detailed API documentation.

## 📮 Postman Collection

Import the `postman_collection.json` file into Postman to test all API endpoints.

**Quick Start**:
1. Open Postman
2. Import `postman_collection.json`
3. Set environment variable `baseUrl` to `http://localhost:3000`
4. Test endpoints in this order:
   - Signup → Login → Get Profile → Create Task → Get Tasks

## 🎨 UI/UX Highlights

- **Modern Design**: Gradient backgrounds, smooth transitions, glassmorphism effects
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Loading States**: Spinners and disabled states during API calls
- **Error Handling**: Clear, user-friendly error messages
- **Success Feedback**: Toast-style notifications
- **Form Validation**: Real-time client-side validation
- **Accessibility**: Semantic HTML, proper labels, keyboard navigation

## 🔐 Security Features

1. **Password Security**
   - Passwords hashed with bcryptjs (10 salt rounds)
   - Never stored in plain text
   - Minimum 6 characters enforced

2. **JWT Authentication**
   - Tokens expire in 7 days
   - Stored in localStorage (client-side)
   - Sent via Authorization header
   - Validated on every protected route

3. **Input Validation**
   - Client-side validation (instant feedback)
   - Server-side validation (security)
   - Email format validation
   - Required field checks

4. **Error Handling**
   - Consistent error response format
   - No sensitive data in error messages
   - Proper HTTP status codes
   - Backend logging for debugging

## 📈 Scaling for Production

### 1. **Deployment**
- Deploy frontend on **Vercel** (optimized for Next.js)
- Use **MongoDB Atlas** for managed database
- Set up **CI/CD pipeline** (GitHub Actions)
- Enable **automatic deployments** from main branch

### 2. **Environment Management**
- Use separate environments: dev, staging, production
- Store secrets in **Vercel Environment Variables**
- Never commit `.env.local` to Git
- Rotate JWT secrets regularly

### 3. **Database Optimization**
- Add **indexes** on frequently queried fields (userId, status, createdAt)
- Implement **pagination** for task lists (limit 50 per page)
- Use **MongoDB connection pooling**
- Set up **database backups** (daily)

### 4. **Performance**
- Implement **Redis caching** for frequently accessed data
- Add **rate limiting** (express-rate-limit) - 100 requests/15min
- Enable **gzip compression**
- Use **CDN** for static assets
- Implement **lazy loading** for images

### 5. **Security Enhancements**
- Add **CORS configuration** (whitelist allowed origins)
- Implement **refresh tokens** (short-lived access tokens)
- Add **HTTPS** enforcement
- Set up **security headers** (helmet.js)
- Implement **2FA** for sensitive accounts
- Add **rate limiting** per user/IP

### 6. **Monitoring & Logging**
- Set up **error tracking** (Sentry)
- Add **performance monitoring** (Vercel Analytics)
- Implement **structured logging** (Winston)
- Set up **uptime monitoring** (UptimeRobot)
- Create **alerting system** for critical errors

### 7. **Additional Features**
- Add **email verification** on signup
- Implement **password reset** flow
- Add **task sharing** between users
- Implement **real-time updates** (Socket.io)
- Add **file attachments** to tasks
- Create **mobile app** (React Native)

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build for production (tests compilation)
npm run build
```

**Recommended Testing Strategy**:
- Unit tests: Jest + React Testing Library
- API tests: Supertest
- E2E tests: Playwright or Cypress
- Coverage target: 80%+

## 🤝 Contributing

This is an internship assignment project. For production use:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for educational purposes as part of a frontend developer internship assignment.

## 👨‍💻 Author

Created as part of Frontend Developer Intern shortlisting assignment.

---

**Built with ❤️ using Next.js, TailwindCSS, and MongoDB**
