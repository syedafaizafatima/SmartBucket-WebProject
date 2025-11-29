# SmartBasket - Project Structure

## Recommended Folder Structure

```
SmartBasket/
│
├── backend/                    # Node.js + Express Backend
│   ├── config/
│   │   ├── database.js        # MongoDB connection
│   │   └── cloudinary.js      # Image upload config (optional)
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── productController.js
│   │   ├── shoppingListController.js
│   │   ├── recipeController.js
│   │   ├── subscriptionController.js
│   │   ├── transactionController.js
│   │   ├── blogController.js
│   │   └── adminController.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── ShoppingList.js
│   │   ├── Recipe.js
│   │   ├── Subscription.js
│   │   ├── Transaction.js
│   │   ├── Order.js
│   │   ├── Blog.js
│   │   └── Review.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── shoppingListRoutes.js
│   │   ├── recipeRoutes.js
│   │   ├── subscriptionRoutes.js
│   │   ├── transactionRoutes.js
│   │   ├── blogRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── middleware/
│   │   ├── auth.js            # JWT verification
│   │   ├── upload.js          # Multer config
│   │   └── errorHandler.js
│   │
│   ├── utils/
│   │   ├── pdfGenerator.js    # PDF generation for cashflow
│   │   ├── priceComparison.js
│   │   ├── aiRecommendations.js
│   │   └── validators.js
│   │
│   ├── .env                   # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js              # Entry point
│
├── frontend/                   # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.js
│   │   │   │   ├── Footer.js
│   │   │   │   ├── Loading.js
│   │   │   │   └── ErrorMessage.js
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── Login.js
│   │   │   │   ├── Register.js
│   │   │   │   └── ProtectedRoute.js
│   │   │   │
│   │   │   ├── products/
│   │   │   │   ├── ProductCard.js
│   │   │   │   ├── ProductList.js
│   │   │   │   ├── ProductDetail.js
│   │   │   │   └── PriceComparison.js
│   │   │   │
│   │   │   ├── shopping/
│   │   │   │   ├── ShoppingList.js
│   │   │   │   ├── Cart.js
│   │   │   │   └── CartItem.js
│   │   │   │
│   │   │   ├── recipes/
│   │   │   │   ├── RecipeCard.js
│   │   │   │   ├── RecipeList.js
│   │   │   │   └── RecipeDetail.js
│   │   │   │
│   │   │   ├── subscriptions/
│   │   │   │   ├── SubscriptionCard.js
│   │   │   │   └── SubscriptionForm.js
│   │   │   │
│   │   │   ├── financial/
│   │   │   │   ├── TransactionHistory.js
│   │   │   │   ├── CashflowStatement.js
│   │   │   │   └── FinancialDashboard.js
│   │   │   │
│   │   │   ├── blog/
│   │   │   │   ├── BlogCard.js
│   │   │   │   ├── BlogList.js
│   │   │   │   └── BlogDetail.js
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.js
│   │   │       ├── Analytics.js
│   │   │       └── AdminPanel.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Profile.js
│   │   │   ├── Products.js
│   │   │   ├── ShoppingLists.js
│   │   │   ├── Recipes.js
│   │   │   ├── Subscriptions.js
│   │   │   ├── Financial.js
│   │   │   ├── Blog.js
│   │   │   └── Admin.js
│   │   │
│   │   ├── services/
│   │   │   ├── api.js          # Axios instance
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   └── ...
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   │
│   │   ├── utils/
│   │   │   ├── helpers.js
│   │   │   └── constants.js
│   │   │
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   │
│   ├── .env
│   ├── package.json
│   └── .gitignore
│
├── docs/                       # Documentation
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SCHEMA.md
│   └── DEPLOYMENT_GUIDE.md
│
├── .gitignore
├── README.md
├── IMPLEMENTATION_PHASES.md
├── QUICK_REFERENCE.md
└── PROJECT_STRUCTURE.md
```

---

## Key Files to Create First

### Backend (`backend/`)

1. **server.js** - Main entry point
2. **config/database.js** - MongoDB connection
3. **models/User.js** - User schema (with photo & biography fields)
4. **routes/authRoutes.js** - Authentication routes
5. **middleware/auth.js** - JWT verification

### Frontend (`frontend/`)

1. **src/App.js** - Main app component with routing
2. **src/services/api.js** - Axios configuration
3. **src/context/AuthContext.js** - Authentication state
4. **src/components/common/Navbar.js** - Navigation
5. **src/pages/Home.js** - Home page

---

## Database Schema Overview

### User Model
```javascript
{
  name, email, password (hashed),
  photo: String (URL),
  biography: String,
  dietaryPreferences: [String],
  createdAt, updatedAt
}
```

### Product Model
```javascript
{
  name, description, category,
  brand, price, images: [String],
  dietaryTags: [String],
  stores: [{storeName, price, availability}],
  createdAt, updatedAt
}
```

### Transaction Model
```javascript
{
  userId, type: 'debit' | 'credit',
  amount, description, category,
  relatedTo: {type: 'subscription' | 'order', id},
  date, createdAt
}
```

### Subscription Model
```javascript
{
  userId, items: [{productId, quantity}],
  frequency: 'weekly' | 'biweekly' | 'monthly',
  nextDelivery: Date,
  status: 'active' | 'paused' | 'cancelled',
  discount: Number,
  createdAt, updatedAt
}
```

### Blog Model
```javascript
{
  title, content, author: userId,
  images: [String], tags: [String],
  publishDate, featured: Boolean,
  createdAt, updatedAt
}
```

---

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartbasket
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_key
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_CLOUDINARY_URL=your_cloudinary_url
```

---

## NPM Packages to Install

### Backend
```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken cors multer
npm install pdfkit stripe
npm install --save-dev nodemon
```

### Frontend
```bash
npm install react react-dom react-router-dom axios
npm install bootstrap react-bootstrap  # Bootstrap 5
npm install chart.js react-chartjs-2  # For analytics
npm install jsPDF  # For client-side PDF (optional)
```

**Note:** After installing Bootstrap, import it in your `src/index.js`:
```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

---

## Next Steps

1. Create the folder structure
2. Initialize both backend and frontend projects
3. Set up MongoDB connection
4. Create User model with photo and biography fields
5. Implement basic authentication
6. Create first API endpoint and test it from frontend

