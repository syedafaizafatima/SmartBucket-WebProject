# Minimal Installation Guide

If you're experiencing disk space issues, you can install only the essential packages first and add others later.

## Step 1: Backup Current package.json
```powershell
Copy-Item package.json package-full.json
```

## Step 2: Use Minimal package.json
```powershell
Copy-Item package-minimal.json package.json
```

## Step 3: Install Essential Packages Only
```powershell
npm install
```

## Step 4: Test the Server
```powershell
npm start
```

The server should start, but some features won't work yet (file uploads, PDF generation, payments).

## Step 5: Add Packages as Needed

### When you need file uploads (Phase 2 - User Profile):
```powershell
npm install multer --save
```

### When you need PDF generation (Phase 8 - Cashflow):
```powershell
npm install pdfkit --save
```

### When you need payment processing (Phase 7 - Subscriptions):
```powershell
npm install stripe --save
```

### When you need auto-restart during development:
```powershell
npm install nodemon --save-dev
```

Then update package.json scripts:
```json
"dev": "nodemon server.js"
```

## Note
- The server will run with minimal packages
- You'll need to comment out routes that require missing packages
- Add packages incrementally as you build features

