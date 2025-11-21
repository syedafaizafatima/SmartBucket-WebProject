# Adding Packages Later

Your backend is now running with minimal packages. Add these packages when you need them:

## Phase 2: User Profile with Photo Upload

When you implement photo uploads:
```powershell
npm install multer --save
```

## Phase 7: Subscription Payments

When you implement payment processing:
```powershell
npm install stripe --save
```

## Phase 8: PDF Generation for Cashflow

When you implement PDF cashflow statements:
```powershell
npm install pdfkit --save
```

## Development: Auto-restart

For automatic server restart during development:
```powershell
npm install nodemon --save-dev
```

Then update `package.json` scripts:
```json
"dev": "nodemon server.js"
```

## Restore Full package.json

If you get more disk space later:
```powershell
Copy-Item package-full.json package.json -Force
npm install
```

## Current Status

✅ **Working:**
- Express server
- MongoDB connection
- Authentication (JWT)
- All API routes
- All controllers
- All models

⚠️ **Not Working Yet (need packages):**
- File uploads (multer)
- PDF generation (pdfkit)
- Payment processing (stripe)
- Auto-restart (nodemon)

These features will return proper error messages if accessed without the packages installed.

