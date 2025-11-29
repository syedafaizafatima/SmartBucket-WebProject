# Environment Variables Setup Guide

## Backend .env File

**Location:** `backend/.env.example` → Copy to `backend/.env`

### How to Create:

**Windows PowerShell:**
```powershell
cd backend
Copy-Item .env.example .env
```

**Or manually:**
1. Go to `backend` folder
2. Copy `env.example.txt` or `.env.example`
3. Rename it to `.env` (remove .txt extension)
4. Edit the file and update the values

### Required Variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration (REQUIRED)
MONGODB_URI=mongodb://localhost:27017/smartbasket
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartbasket

# JWT Configuration (REQUIRED - Change the secret!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Optional Variables (add later when needed):

```env
# File Upload (Cloudinary - Optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Payment (Stripe - Optional)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

---

## Frontend .env File

**Location:** `frontend/.env.example` → Copy to `frontend/.env`

### How to Create:

**Windows PowerShell:**
```powershell
cd frontend
Copy-Item .env.example .env
```

### Required Variables:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Optional Variables:

```env
REACT_APP_CLOUDINARY_URL=your_cloudinary_url
```

---

## Quick Setup Steps

1. **Backend:**
   ```powershell
   cd backend
   Copy-Item .env.example .env
   # Then edit .env and update MONGODB_URI and JWT_SECRET
   ```

2. **Frontend:**
   ```powershell
   cd frontend
   Copy-Item .env.example .env
   # Usually no changes needed unless backend runs on different port
   ```

---

## Important Notes

- ⚠️ **Never commit `.env` files to Git** (they're in .gitignore)
- ✅ **Do commit `.env.example` files** (they're templates)
- 🔒 **Change JWT_SECRET** to a random secure string
- 📝 **Update MONGODB_URI** with your actual MongoDB connection string

---

## MongoDB Connection Strings

### Local MongoDB:
```
MONGODB_URI=mongodb://localhost:27017/smartbasket
```

### MongoDB Atlas (Cloud):
1. Go to MongoDB Atlas dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with `smartbasket`

Example:
```
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/smartbasket?retryWrites=true&w=majority
```

---

## Generate Secure JWT Secret

You can generate a secure random string for JWT_SECRET:

**PowerShell:**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**Or use an online generator:**
- https://randomkeygen.com/
- Use "CodeIgniter Encryption Keys" - 32 characters

