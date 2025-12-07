# 🛒 SmartBasket - Smart Grocery Shopping Platform

A full-stack web application for intelligent grocery shopping with price comparison, AI-powered lists, recipe recommendations, and financial tracking.

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ (includes npm)
- MongoDB Atlas account (free) OR local MongoDB
- Visual Studio Code (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/syedafaizafatima/SmartBucket-WebProject.git
   cd SmartBucket-WebProject
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**

   **Backend (.env)** - Create `backend/.env`:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartbasket
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

   **Frontend (.env)** - Create `frontend/.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Get MongoDB URI**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free cluster
   - Get connection string from "Connect" → "Connect your application"
   - Replace `<password>` and `<dbname>` in connection string

6. **Generate JWT Secret**
   - Run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Copy the output to `JWT_SECRET` in backend/.env

7. **Run the Application**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm start
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm start
   ```

8. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📦 Seed Database (Optional)

```bash
cd backend
npm run seed              # Add sample products
npm run seed:recipes      # Add sample recipes
npm run seed:subscriptions # Add sample subscriptions (requires login)
npm run seed:transactions # Add sample transactions (requires login)
```

## 🎯 Features

- **Price Comparison** - Compare prices across multiple stores
- **AI Shopping Lists** - Smart list generation based on preferences
- **Recipe Recommendations** - Personalized recipes based on dietary needs
- **Subscriptions** - Manage recurring product deliveries
- **Financial Tracking** - Track spending with detailed analytics
- **Group Buys** - Participate in bulk purchase discounts
- **Blog System** - Read and write cooking/shopping articles
- **Product Reviews** - Rate and review products
- **User Profiles** - Complete profile management with image upload

## 🛠️ Technology Stack

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

**Frontend:**
- React 18
- React Router DOM
- Bootstrap 5 + React Bootstrap
- Axios for API calls
- Chart.js for analytics

## 📁 Project Structure

```
SmartBucket-WebProject/
├── backend/          # Node.js/Express API
│   ├── controllers/  # Business logic
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   ├── middleware/   # Auth & error handling
│   └── server.js     # Entry point
├── frontend/         # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   └── context/    # React context
│   └── public/
└── docs/             # Documentation
```

## 🔐 Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - Token expiration (default: 7d)
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL

## 📚 API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/products` - Get products
- `GET /api/recipes` - Get recipes
- `GET /api/shopping-lists` - Get shopping lists (protected)
- `GET /api/subscriptions` - Get subscriptions (protected)
- `GET /api/transactions` - Get transactions (protected)

See `COMPLETE_SETUP_GUIDE.txt` for full API documentation.

## 🐛 Troubleshooting

**Port already in use:**
- Change `PORT` in backend/.env
- Update `REACT_APP_API_URL` in frontend/.env

**MongoDB connection error:**
- Verify `MONGODB_URI` is correct
- Check Atlas IP whitelist
- Backend runs without DB (features won't work)

**CORS errors:**
- Ensure `FRONTEND_URL` matches frontend URL
- Check `REACT_APP_API_URL` is correct

## 📝 License

ISC

## 👥 Contributors

- Syeda Faiza Fatima
- Momin Malik
-Shamsher Ali
Muhammad Basim Zafar

## 📖 Documentation

See `COMPLETE_SETUP_GUIDE.txt` for detailed setup instructions and file explanations.

---

**Note:** Make sure to keep your `.env` files secure and never commit sensitive information to public repositories.

