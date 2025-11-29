# MongoDB Quick Start (5 Minutes)

## Fastest Way: MongoDB Atlas (Cloud)

### 1. Sign Up (1 minute)
- Go to: https://www.mongodb.com/cloud/atlas/register
- Sign up with email or Google

### 2. Create Free Cluster (2 minutes)
- Click "Build a Database"
- Choose **"M0 FREE"** (Free tier)
- Select a region
- Click "Create"

### 3. Create Database User (1 minute)
- Go to "Database Access" → "Add New Database User"
- Username: `smartbasket_user`
- Password: (create a strong password - save it!)
- Privileges: "Read and write to any database"
- Click "Add User"

### 4. Allow Network Access (30 seconds)
- Go to "Network Access" → "Add IP Address"
- Click **"Allow Access from Anywhere"** (for development)
- Click "Confirm"

### 5. Get Connection String (30 seconds)
- Go to "Database" → Click "Connect" on your cluster
- Choose "Connect your application"
- Select "Node.js"
- Copy the connection string

### 6. Update .env File

Open `backend/.env` and update:

```env
MONGODB_URI=mongodb+srv://smartbasket_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/smartbasket?retryWrites=true&w=majority
```

**Replace:**
- `smartbasket_user` → Your username
- `YOUR_PASSWORD` → Your password
- `cluster0.xxxxx` → Your cluster name
- Add `/smartbasket` before the `?` (database name)

### 7. Test Connection

```powershell
cd backend
node server.js
```

You should see: `MongoDB Connected: cluster0.xxxxx.mongodb.net`

---

## That's It! 🎉

Your MongoDB is ready to use. The connection string is now in your `.env` file.

---

## Visual Guide

```
MongoDB Atlas Dashboard
├── Database → Connect → Connect your application
│   └── Copy connection string
│
├── Database Access → Add New Database User
│   └── Create username and password
│
└── Network Access → Add IP Address
    └── Allow from anywhere (for dev)
```

---

## Connection String Format

```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME?options
```

**Example:**
```
mongodb+srv://john:MyPass123@cluster0.abc123.mongodb.net/smartbasket?retryWrites=true&w=majority
```

---

## Troubleshooting

**"Authentication failed"**
→ Check username/password in connection string

**"IP not whitelisted"**
→ Go to Network Access and add your IP

**"Connection timeout"**
→ Check internet connection

**Still having issues?**
→ See `MONGODB_SETUP.md` for detailed guide

