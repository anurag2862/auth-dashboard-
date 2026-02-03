# Frontend Developer Intern Assignment (Auth + Dashboard)

This project is a full-stack web application featuring a secure authentication system and a functional dashboard with CRUD operations.

## 🛠 1. Tech Stack
- **Frontend:** React.js / Next.js, TailwindCSS, Axios
- **Backend:** Node.js, Next.js API Routes (Express-style)
- **Database:** MongoDB (Mongoose)
- **Security:** JWT (JSON Web Tokens), Bcrypt.js (Password Hashing)

## ⚙️ 2. Setup & Installation (Env Vars & DB)

### Project Setup:
1. Navigate to project folder: `cd auth-dashboard-app`
2. Install dependencies: `npm install`
3. Create a `.env.local` file and add:
   ```env
   # Backend & DB Config
   MONGODB_URI=mongodb://localhost:27017/auth-dashboard
   JWT_SECRET=your_secret_key_123
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```
4. Ensure MongoDB is running locally:
   ```bash
   brew services start mongodb-community@8.0
   ```

## 🚀 3. How to Run
Start Backend & Frontend together (Next.js):
```bash
npm run dev
```

## 🔑 4. Demo Credentials
Use these to test the dashboard without signing up:
- **Email:** `test@example.com`
- **Password:** `test123`

## 📂 5. Postman Collection
The API documentation is provided in the root folder as:
- **File:** `postman_collection.json` (Please import this in Postman).

## 📈 6. How would you scale this for production?
To scale this application for real-world production, I would:

- **Deployment:** Use Vercel for the frontend and AWS (EC2/ECS) or Docker containers for the backend.
- **CORS & Security:** Implement strict CORS policies, Helmet.js for security headers, and Rate Limiting to prevent attacks.
- **Database:** Add DB Indexing for faster queries and use Redis for caching frequent requests.
- **Env Management:** Use AWS Secrets Manager or Vault to securely store environment variables.
- **Monitoring:** Integrate Sentry for error tracking and Winston/Morgan for structured logging.
