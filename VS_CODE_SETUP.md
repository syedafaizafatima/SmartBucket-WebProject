# How to Run SmartBasket Project in VS Code

## Prerequisites

Before starting, make sure you have installed:
- ✅ **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- ✅ **MongoDB** (local installation) OR **MongoDB Atlas** account (free cloud database)
- ✅ **VS Code** with integrated terminal

## Step-by-Step Setup

### Step 1: Open Project in VS Code

1. Open VS Code
2. Click **File → Open Folder**
3. Navigate to and select: `D:\Downloads D\web project 1`
4. Click **Select Folder**

### Step 2: Set Up Backend Environment Variables

1. In VS Code, navigate to the `backend` folder
2. Right-click on `env.example.txt` → **Copy**
3. Right-click in the same folder → **New File**
4. Name it `.env` (make sure it starts with a dot)
5. Open `env.example.txt` and copy all its contents
6. Paste into `.env` file
7. Update the following values:
   ```
   MONGODB_URI=mongodb://localhost:27017/smartbasket
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   FRONTEND_URL=http://localhost:3000
   ```

**For MongoDB Atlas users:**
- Replace `MONGODB_URI` with your Atlas connection string
- Format: `mongodb+srv://username:password@cluster.mongodb.net/smartbasket`

### Step 3: Set Up Frontend Environment Variables

1. Navigate to the `frontend` folder
2. Right-click on `env.example.txt` → **Copy**
3. Right-click in the same folder → **New File**
4. Name it `.env` (make sure it starts with a dot)
5. Open `env.example.txt` and copy all its contents
6. Paste into `.env` file
7. The default value should work: `REACT_APP_API_URL=http://localhost:5000/api`

### Step 4: Install Backend Dependencies

1. Open VS Code's integrated terminal:
   - Press `` Ctrl + ` `` (backtick) OR
   - Go to **Terminal → New Terminal**
2. In the terminal, navigate to backend:
   ```powershell
   cd backend
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Wait for installation to complete

### Step 5: Install Frontend Dependencies

1. Open a **NEW** terminal in VS Code:
   - Click the **+** button in terminal panel OR
   - Press `` Ctrl + Shift + ` `` for new terminal
2. Navigate to frontend:
   ```powershell
   cd frontend
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Wait for installation to complete

### Step 6: Set Up MongoDB

**Option A: Local MongoDB**
1. Make sure MongoDB is installed and running
2. Start MongoDB service (usually runs automatically on Windows)
3. Your `.env` file should have: `MONGODB_URI=mongodb://localhost:27017/smartbasket`

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster (free tier)
4. Get your connection string
5. Update `MONGODB_URI` in backend `.env` file

### Step 7: Seed the Database (Optional but Recommended)

1. In the backend terminal, run:
   ```powershell
   npm run seed
   ```
2. You should see: "Seeded X products successfully"
3. This populates the database with sample products for testing

### Step 8: Start Backend Server

1. In the backend terminal (or open a new one), make sure you're in the `backend` folder:
   ```powershell
   cd backend
   ```
2. Start the server:
   ```powershell
   npm run dev
   ```
3. You should see:
   ```
   MongoDB Connected: ...
   Server is running on port 5000
   Environment: development
   ```
4. **Keep this terminal open** - the server needs to keep running

### Step 9: Start Frontend Development Server

1. Open a **NEW** terminal (you should have 2 terminals now)
2. Navigate to frontend:
   ```powershell
   cd frontend
   ```
3. Start the React app:
   ```powershell
   npm start
   ```
4. Wait for it to compile (may take 30-60 seconds)
5. Your browser should automatically open to `http://localhost:3000`
6. If it doesn't, manually open: `http://localhost:3000`

## VS Code Tips

### Using Multiple Terminals

VS Code allows you to split terminals:
1. Click the **Split Terminal** icon (looks like a split pane) in the terminal panel
2. Or right-click terminal tab → **Split Terminal**
3. You can have:
   - Terminal 1: Backend server (`npm run dev`)
   - Terminal 2: Frontend server (`npm start`)

### Terminal Shortcuts

- `` Ctrl + ` `` - Toggle terminal
- `` Ctrl + Shift + ` `` - New terminal
- `` Ctrl + Shift + 5 `` - Split terminal

### Running Commands Quickly

1. Press `` Ctrl + ` `` to open terminal
2. Type your command
3. Use **Tab** to auto-complete folder names

### Debugging

**Backend Debugging:**
1. Go to **Run and Debug** (Ctrl+Shift+D)
2. Click **create a launch.json file**
3. Select **Node.js**
4. Add this configuration:
   ```json
   {
     "type": "node",
     "request": "launch",
     "name": "Launch Backend",
     "skipFiles": ["<node_internals>/**"],
     "program": "${workspaceFolder}/backend/server.js",
     "env": {
       "NODE_ENV": "development"
     }
   }
   ```

**Frontend Debugging:**
- React app runs in browser
- Use browser DevTools (F12)
- VS Code Chrome Debugger extension can be used

## Testing the Application

1. **Open Browser:** `http://localhost:3000`
2. **Register a new account:**
   - Click "Register" in navbar
   - Fill in name, email, password
   - Click "Register"
3. **Browse Products:**
   - Click "Products" in navbar
   - You should see sample products (if you ran seed)
   - Try searching and filtering
4. **View Product Details:**
   - Click on any product
   - See price comparison across stores

## Common Issues & Solutions

### Issue: "Port 5000 already in use"
**Solution:** 
- Change `PORT=5001` in backend `.env`
- Update frontend `.env`: `REACT_APP_API_URL=http://localhost:5001/api`

### Issue: "MongoDB connection error"
**Solution:**
- Check if MongoDB is running (local) or connection string is correct (Atlas)
- Make sure IP is whitelisted in MongoDB Atlas

### Issue: "Module not found"
**Solution:**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

### Issue: "CORS error"
**Solution:**
- Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Default: `http://localhost:3000`

## Quick Start Checklist

- [ ] Opened project in VS Code
- [ ] Created `.env` file in `backend` folder
- [ ] Created `.env` file in `frontend` folder
- [ ] Installed backend dependencies (`npm install` in backend)
- [ ] Installed frontend dependencies (`npm install` in frontend)
- [ ] MongoDB is running (local or Atlas)
- [ ] Seeded database (`npm run seed` in backend)
- [ ] Backend server running (`npm run dev` in backend)
- [ ] Frontend server running (`npm start` in frontend)
- [ ] Browser opened to `http://localhost:3000`

## Project Structure in VS Code

```
📁 web project 1/
├── 📁 backend/          ← Backend code (Node.js/Express)
│   ├── .env            ← Backend environment variables (create this)
│   ├── server.js       ← Main server file
│   └── ...
├── 📁 frontend/        ← Frontend code (React)
│   ├── .env            ← Frontend environment variables (create this)
│   ├── src/            ← React source code
│   └── ...
└── ...
```

## Next Steps

Once everything is running:
1. ✅ Test user registration and login
2. ✅ Browse products and test search/filters
3. ✅ View product details and price comparisons
4. ✅ Update your profile

Happy coding! 🚀



