# SmartBasket - Setup Instructions

## Prerequisites

- Node.js (v14 or higher) installed
- MongoDB installed locally OR MongoDB Atlas account
- Git installed

## Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Copy the example file
   # On Windows PowerShell:
   Copy-Item .env.example .env
   
   # On Mac/Linux:
   cp .env.example .env
   ```

4. **Configure environment variables**
   - Open `.env` file
   - Update `MONGODB_URI` with your MongoDB connection string
   - Update `JWT_SECRET` with a secure random string
   - For local MongoDB: `mongodb://localhost:27017/smartbasket`
   - For MongoDB Atlas: Use your connection string from Atlas dashboard

5. **Create uploads directory** (for file uploads)
   ```bash
   mkdir uploads
   ```

6. **Start the backend server**
   ```bash
   npm run dev
   ```
   
   The server should start on `http://localhost:5000`

## Frontend Setup

1. **Navigate to frontend directory** (in a new terminal)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # On Windows PowerShell:
   Copy-Item .env.example .env
   
   # On Mac/Linux:
   cp .env.example .env
   ```

4. **Configure environment variables**
   - Open `.env` file
   - Make sure `REACT_APP_API_URL` points to your backend URL
   - Default: `http://localhost:5000/api`

5. **Start the frontend development server**
   ```bash
   npm start
   ```
   
   The app should open in your browser at `http://localhost:3000`

## Testing the Setup

1. **Test Backend API**
   - Open browser and go to: `http://localhost:5000`
   - You should see a JSON response with API information

2. **Test Frontend**
   - The React app should load at `http://localhost:3000`
   - You should see the SmartBasket homepage

3. **Test Registration**
   - Click "Register" in the navbar
   - Create a test account
   - You should be redirected to home page after successful registration

4. **Test Login**
   - Click "Login" in the navbar
   - Login with your test account
   - You should be redirected to home page

## Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running (if using local MongoDB)
- Check your connection string in `.env`
- For MongoDB Atlas: Make sure your IP is whitelisted

### Port Already in Use
- Backend: Change `PORT` in `.env` file
- Frontend: React will ask to use a different port automatically

### CORS Errors
- Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Default: `http://localhost:3000`

### Module Not Found Errors
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

## Next Steps

1. **Create an Admin User** (manually in MongoDB or via API)
   - Set `role: 'admin'` in the user document

2. **Seed Database with Sample Products** (optional)
   - You can create a seed script or add products via the admin panel

3. **Start Building Features**
   - Follow the implementation phases in `IMPLEMENTATION_PHASES.md`
   - Start with Phase 2: User Authentication & Profile Management

## Development Tips

- Use `npm run dev` for backend (auto-restarts on changes)
- Use `npm start` for frontend (auto-reloads on changes)
- Check browser console for frontend errors
- Check terminal for backend errors
- Use Postman or similar tool to test API endpoints

## Project Structure

```
Project_SmartBucket/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Need Help?

- Check the documentation files:
  - `IMPLEMENTATION_PHASES.md` - Detailed phase-by-phase guide
  - `QUICK_REFERENCE.md` - Quick reference and timeline
  - `PROJECT_STRUCTURE.md` - Detailed folder structure
  - `BOOTSTRAP_SETUP.md` - Bootstrap usage guide

