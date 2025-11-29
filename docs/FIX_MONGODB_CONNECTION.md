# Fix MongoDB Connection String

## The Problem

Your MongoDB connection string has special characters in the password that need to be URL-encoded, and it's missing the database name.

## The Solution

### Special Characters That Need Encoding

- `<` becomes `%3C`
- `>` becomes `%3E`
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- `%` becomes `%25`
- `&` becomes `%26`
- `+` becomes `%2B`
- `=` becomes `%3D`
- `?` becomes `%3F`

### Your Password Encoding

Your password: `<6cSE@jEW.46UFH>`

Encoded: `%3C6cSE%40jEW.46UFH%3E`

### Connection String Format

**Before (incorrect):**
```
mongodb+srv://l226912_db_user:<6cSE@jEW.46UFH>@cluster0.wzowmei.mongodb.net/?appName=Cluster0
```

**After (correct):**
```
mongodb+srv://l226912_db_user:%3C6cSE%40jEW.46UFH%3E@cluster0.wzowmei.mongodb.net/smartbasket?retryWrites=true&w=majority
```

### Changes Made:
1. ✅ URL-encoded the password: `<6cSE@jEW.46UFH>` → `%3C6cSE%40jEW.46UFH%3E`
2. ✅ Added database name: `/smartbasket` before the `?`
3. ✅ Updated query parameters: `?retryWrites=true&w=majority`

## Update Your .env File

Open `backend/.env` and make sure the MONGODB_URI line looks like this:

```env
MONGODB_URI=mongodb+srv://l226912_db_user:%3C6cSE%40jEW.46UFH%3E@cluster0.wzowmei.mongodb.net/smartbasket?retryWrites=true&w=majority
```

## Test the Connection

Restart your server:

```powershell
# Stop the server (Ctrl+C)
# Then start again:
npm run dev
```

You should see:
```
MongoDB Connected: cluster0.wzowmei.mongodb.net
Server is running on port 5000
```

## Alternative: Change Your MongoDB Password

If URL encoding is confusing, you can change your MongoDB password to one without special characters:

1. Go to MongoDB Atlas → Database Access
2. Click on your user
3. Click "Edit" → Change password
4. Create a new password without special characters (e.g., `MySecurePass123`)
5. Update your connection string with the new password

## Quick Reference: URL Encoding

| Character | Encoded |
|-----------|---------|
| `<` | `%3C` |
| `>` | `%3E` |
| `@` | `%40` |
| `#` | `%23` |
| `$` | `%24` |
| `%` | `%25` |
| `&` | `%26` |
| `+` | `%2B` |
| `=` | `%3D` |
| `?` | `%3F` |
| `/` | `%2F` |
| `:` | `%3A` |

