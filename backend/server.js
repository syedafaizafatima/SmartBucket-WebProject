const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartbasket', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.warn('⚠️  Server will continue without database connection. Database features will not work.');
    return false;
  }
};

// Connect to database (non-blocking)
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err.message);
});

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'SmartBasket API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      products: '/api/products',
      shoppingLists: '/api/shopping-lists',
      recipes: '/api/recipes',
      subscriptions: '/api/subscriptions',
      transactions: '/api/transactions',
      blogs: '/api/blogs',
      admin: '/api/admin',
      reviews: '/api/reviews',
      groupBuys: '/api/group-buys',
      notifications: '/api/notifications'
    }
  });
});

// API Routes
try {
  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/users', require('./routes/userRoutes'));
  app.use('/api/products', require('./routes/productRoutes'));
  app.use('/api/shopping-lists', require('./routes/shoppingListRoutes'));
  app.use('/api/recipes', require('./routes/recipeRoutes'));
  app.use('/api/subscriptions', require('./routes/subscriptionRoutes'));
  app.use('/api/transactions', require('./routes/transactionRoutes'));
  app.use('/api/blogs', require('./routes/blogRoutes'));
  app.use('/api/admin', require('./routes/adminRoutes'));
  app.use('/api/reviews', require('./routes/reviewRoutes'));
  app.use('/api/group-buys', require('./routes/groupBuyRoutes'));
  app.use('/api/notifications', require('./routes/notificationRoutes'));
} catch (error) {
  console.warn('Some routes may not be available:', error.message);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

