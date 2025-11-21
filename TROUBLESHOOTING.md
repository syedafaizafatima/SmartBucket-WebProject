# Troubleshooting Guide

## ENOSPC Error (No Space Left on Device)

### Solution 1: Clean npm Cache
```powershell
npm cache clean --force
```

### Solution 2: Check Disk Space
```powershell
# Check C: drive space
Get-PSDrive C | Select-Object Used,Free

# Or use File Explorer to check available space
```

### Solution 3: Free Up Disk Space
1. **Delete temporary files:**
   ```powershell
   # Clean Windows temp files
   Remove-Item -Path "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
   ```

2. **Clean npm cache and temp:**
   ```powershell
   npm cache clean --force
   Remove-Item -Path "$env:APPDATA\npm-cache" -Recurse -Force -ErrorAction SilentlyContinue
   ```

3. **Delete node_modules if they exist:**
   ```powershell
   Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
   ```

### Solution 4: Install with Limited Dependencies
If you're still having issues, try installing dependencies one by one:

```powershell
# Install only essential packages first
npm install express mongoose dotenv --save
npm install bcryptjs jsonwebtoken cors --save
npm install multer pdfkit stripe --save
npm install nodemon --save-dev
```

### Solution 5: Use Yarn Instead (Alternative)
If npm continues to have issues:

```powershell
# Install Yarn globally
npm install -g yarn

# Then use yarn instead
yarn install
```

### Solution 6: Increase File Handle Limit (Windows)
Sometimes ENOSPC is actually a file handle limit issue:

1. Open Registry Editor (regedit)
2. Navigate to: `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters`
3. Create or modify: `MaxUserPort` (DWORD) = 65534
4. Create or modify: `TcpTimedWaitDelay` (DWORD) = 30
5. Restart your computer

### Solution 7: Install to Different Location
If C: drive is full, you can:

1. Move project to a drive with more space (D:, E:, etc.)
2. Or change npm cache location:
   ```powershell
   npm config set cache "D:\npm-cache" --global
   ```

### Solution 8: Minimal Installation
Install only what's absolutely necessary for now:

**Backend minimal package.json:**
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

You can add other packages (multer, pdfkit, stripe) later when you need them.

## Other Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running
- Check connection string in .env
- For MongoDB Atlas: Whitelist your IP address

### Port Already in Use
- Change PORT in .env file
- Or kill the process using the port:
  ```powershell
  # Find process using port 5000
  netstat -ano | findstr :5000
  # Kill process (replace PID with actual process ID)
  taskkill /PID <PID> /F
  ```

### Module Not Found After Installation
```powershell
# Delete and reinstall
Remove-Item -Path "node_modules" -Recurse -Force
Remove-Item -Path "package-lock.json" -Force
npm install
```

### CORS Errors
- Make sure backend .env has correct FRONTEND_URL
- Check that backend server is running
- Verify API URL in frontend .env

## Quick Fixes Checklist

- [ ] Clean npm cache: `npm cache clean --force`
- [ ] Check disk space
- [ ] Delete old node_modules folders
- [ ] Restart terminal/computer
- [ ] Try minimal installation
- [ ] Check internet connection
- [ ] Try different npm registry: `npm config set registry https://registry.npmjs.org/`

