# MongoDB Connection String Guide

## Option 1: MongoDB Atlas (Cloud - Recommended for Beginners)

MongoDB Atlas is a free cloud database service. It's easier to set up and doesn't require installing MongoDB on your computer.

### Step 1: Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** or **"Sign Up"**
3. Sign up with your email (or use Google/GitHub)

### Step 2: Create a Free Cluster

1. After signing in, you'll see the **"Deploy a cloud database"** screen
2. Choose **"M0 FREE"** (Free tier - perfect for development)
3. Select a **Cloud Provider** (AWS, Google Cloud, or Azure)
4. Choose a **Region** (select one closest to you)
5. Click **"Create"** (takes 1-3 minutes)

### Step 3: Create Database User

1. Go to **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter a username (e.g., `smartbasket_user`)
5. Enter a password (save this password!)
6. Under **"Database User Privileges"**, select **"Read and write to any database"**
7. Click **"Add User"**

### Step 4: Whitelist Your IP Address

1. Go to **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Add Current IP Address"** (or **"Allow Access from Anywhere"** for development)
   - For development: Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - For production: Only add your specific IP
4. Click **"Confirm"**

### Step 5: Get Connection String

1. Go to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as the driver
5. Copy the connection string (it looks like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Your .env File

Replace the connection string in `backend/.env`:

```env
MONGODB_URI=mongodb+srv://smartbasket_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/smartbasket?retryWrites=true&w=majority
```

**Important:**
- Replace `<username>` with your database username
- Replace `<password>` with your database password
- Replace `cluster0.xxxxx` with your actual cluster name
- Add `/smartbasket` before the `?` to specify the database name

**Example:**
```env
MONGODB_URI=mongodb+srv://smartbasket_user:MySecurePass123@cluster0.abc123.mongodb.net/smartbasket?retryWrites=true&w=majority
```

---

## Option 2: Local MongoDB (On Your Computer)

If you prefer to run MongoDB on your computer instead of the cloud.

### Step 1: Install MongoDB

**Windows:**
1. Go to [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Select:
   - Version: Latest (or 6.0+)
   - Platform: Windows
   - Package: MSI
3. Download and run the installer
4. During installation:
   - Choose **"Complete"** installation
   - Check **"Install MongoDB as a Service"**
   - Check **"Install MongoDB Compass"** (GUI tool - optional but helpful)

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Linux:**
```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
sudo apt-get install -y mongodb-org
```

### Step 2: Start MongoDB Service

**Windows:**
- MongoDB should start automatically as a Windows service
- Check if it's running: Open Services (Win+R → services.msc) → Look for "MongoDB"

**Mac/Linux:**
```bash
brew services start mongodb-community
# OR
sudo systemctl start mongod
```

### Step 3: Verify MongoDB is Running

Open a terminal and run:
```bash
mongosh
# OR (older versions)
mongo
```

If you see the MongoDB shell prompt, it's working!

### Step 4: Use Connection String

For local MongoDB, use this in your `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/smartbasket
```

**Explanation:**
- `localhost:27017` - Default MongoDB address and port
- `smartbasket` - Your database name (will be created automatically)

---

## Quick Comparison

| Feature | MongoDB Atlas (Cloud) | Local MongoDB |
|---------|----------------------|---------------|
| **Setup Time** | 5-10 minutes | 15-30 minutes |
| **Installation** | None needed | Need to install |
| **Free Tier** | ✅ 512MB free | ✅ Unlimited |
| **Internet Required** | ✅ Yes | ❌ No |
| **Best For** | Beginners, teams | Advanced users |
| **Connection String** | `mongodb+srv://...` | `mongodb://localhost:27017/...` |

---

## Testing Your Connection

### Test with Node.js

Create a test file `backend/test-connection.js`:

```javascript
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartbasket')
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  });
```

Run it:
```powershell
cd backend
node test-connection.js
```

### Test by Starting Your Server

```powershell
cd backend
node server.js
```

You should see:
```
MongoDB Connected: cluster0.xxxxx.mongodb.net
Server is running on port 5000
```

---

## Common Issues & Solutions

### Issue 1: "Authentication failed"
- **Solution:** Check your username and password in the connection string
- Make sure there are no special characters that need URL encoding

### Issue 2: "IP not whitelisted"
- **Solution:** Go to MongoDB Atlas → Network Access → Add your IP address
- For development, you can allow all IPs (0.0.0.0/0)

### Issue 3: "Connection timeout"
- **Solution:** 
  - Check your internet connection
  - Verify the connection string is correct
  - Make sure MongoDB service is running (for local)

### Issue 4: "Invalid connection string"
- **Solution:** 
  - Make sure there are no spaces in the connection string
  - Check that special characters in password are URL-encoded
  - Verify the format matches the examples above

### Issue 5: Password has special characters
- **Solution:** URL-encode special characters in your password
  - `@` becomes `%40`
  - `#` becomes `%23`
  - `$` becomes `%24`
  - Or change your password to not include special characters

---

## Recommended: MongoDB Atlas (Free Tier)

For your course project, I **highly recommend MongoDB Atlas** because:
- ✅ No installation needed
- ✅ Free 512MB storage (enough for development)
- ✅ Works on any computer
- ✅ Easy to share with teammates
- ✅ Automatic backups
- ✅ Web interface to view your data

---

## Next Steps

1. Choose MongoDB Atlas or Local MongoDB
2. Get your connection string
3. Update `backend/.env` file:
   ```env
   MONGODB_URI=your_connection_string_here
   ```
4. Test the connection
5. Start building your app!

---

## Need Help?

- MongoDB Atlas Documentation: [https://docs.atlas.mongodb.com/](https://docs.atlas.mongodb.com/)
- MongoDB University (Free Courses): [https://university.mongodb.com/](https://university.mongodb.com/)
- MongoDB Community Forums: [https://developer.mongodb.com/community/forums/](https://developer.mongodb.com/community/forums/)

