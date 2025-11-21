# Fix MongoDB Authentication Error

## Error: "bad auth : authentication failed"

This means MongoDB Atlas is rejecting your username/password combination.

## Common Causes

1. **Password encoding issue** - Special characters not encoded correctly
2. **Wrong password** - Password doesn't match what's in MongoDB Atlas
3. **Wrong username** - Username doesn't match
4. **User doesn't exist** - User wasn't created properly in MongoDB Atlas

## Solution 1: Verify Your MongoDB Atlas Credentials

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Log in to your account
3. Go to **"Database Access"** in the left sidebar
4. Find your user: `l226912_db_user`
5. Click the **"Edit"** button (pencil icon)
6. Check if you can see the password or need to reset it

## Solution 2: Reset Your MongoDB Password (Recommended)

The easiest solution is to change your password to one without special characters:

### Step 1: Change Password in MongoDB Atlas

1. Go to MongoDB Atlas → **Database Access**
2. Click on your user: `l226912_db_user`
3. Click **"Edit"** button
4. Click **"Edit Password"**
5. Enter a new password **without special characters** (e.g., `MySecurePass123`)
6. Click **"Update User"**

### Step 2: Update Your .env File

Open `backend/.env` and update the connection string:

```env
MONGODB_URI=mongodb+srv://l226912_db_user:MySecurePass123@cluster0.wzowmei.mongodb.net/smartbasket?retryWrites=true&w=majority
```

**Replace `MySecurePass123` with your new password.**

### Step 3: Restart Server

```powershell
# Stop server (Ctrl+C)
npm run dev
```

## Solution 3: Double-Check URL Encoding

If you want to keep your current password, make sure it's encoded correctly:

Your password: `<6cSE@jEW.46UFH>`

Each character encoding:
- `<` = `%3C`
- `6` = `6` (no encoding needed)
- `c` = `c` (no encoding needed)
- `S` = `S` (no encoding needed)
- `E` = `E` (no encoding needed)
- `@` = `%40`
- `j` = `j` (no encoding needed)
- `E` = `E` (no encoding needed)
- `W` = `W` (no encoding needed)
- `.` = `.` (no encoding needed)
- `4` = `4` (no encoding needed)
- `6` = `6` (no encoding needed)
- `U` = `U` (no encoding needed)
- `F` = `F` (no encoding needed)
- `H` = `H` (no encoding needed)
- `>` = `%3E`

Encoded: `%3C6cSE%40jEW.46UFH%3E`

## Solution 4: Create a New Database User

If the user doesn't exist or you're not sure:

1. Go to MongoDB Atlas → **Database Access**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `smartbasket_user` (or any name you want)
5. Password: Create a simple password without special characters
6. Privileges: **"Read and write to any database"**
7. Click **"Add User"**

Then update your `.env`:
```env
MONGODB_URI=mongodb+srv://smartbasket_user:YOUR_NEW_PASSWORD@cluster0.wzowmei.mongodb.net/smartbasket?retryWrites=true&w=majority
```

## Quick Test: Verify Connection String Format

Your connection string should follow this format:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME?options
```

Example:
```
mongodb+srv://myuser:mypass123@cluster0.abc123.mongodb.net/smartbasket?retryWrites=true&w=majority
```

## Recommended: Use Simple Password

For development, use a password like:
- `SmartBasket2024`
- `MyDevPassword123`
- `TestPass123`

Avoid special characters: `< > @ # $ % & + = ?`

## Still Having Issues?

1. **Check Network Access:**
   - Go to MongoDB Atlas → **Network Access**
   - Make sure your IP is whitelisted (or allow from anywhere: `0.0.0.0/0`)

2. **Verify Cluster is Running:**
   - Go to MongoDB Atlas → **Database**
   - Make sure your cluster shows as "Running"

3. **Test Connection from MongoDB Atlas:**
   - Go to Database → Click "Connect" → "Connect your application"
   - Copy the connection string they provide
   - Compare it with yours

4. **Check for Typos:**
   - Username spelling
   - Password spelling
   - Cluster name spelling

