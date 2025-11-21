const User = require('../models/User');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');
const Subscription = require('../models/Subscription');
const Blog = require('../models/Blog');

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    const totalSubscriptions = await Subscription.countDocuments({ status: 'active' });
    const totalBlogs = await Blog.countDocuments();

    // Calculate total revenue from transactions
    const transactions = await Transaction.find({ type: 'credit' });
    const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);

    res.status(200).json({
      success: true,
      data: {
        users: totalUsers,
        products: totalProducts,
        transactions: totalTransactions,
        activeSubscriptions: totalSubscriptions,
        blogs: totalBlogs,
        totalRevenue
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user analytics
// @route   GET /api/admin/analytics/users
// @access  Private/Admin
exports.getUserAnalytics = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
    });

    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        newUsersThisMonth,
        usersByRole
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get sales analytics
// @route   GET /api/admin/analytics/sales
// @access  Private/Admin
exports.getSalesAnalytics = async (req, res, next) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date(new Date().getFullYear(), 0, 1);
    const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();

    const transactions = await Transaction.find({
      date: { $gte: startDate, $lte: endDate }
    });

    const credits = transactions
      .filter(t => t.type === 'credit')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const debits = transactions
      .filter(t => t.type === 'debit')
      .reduce((sum, t) => sum + t.amount, 0);

    const transactionsByCategory = await Transaction.aggregate([
      { $match: { date: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        period: { startDate, endDate },
        totalCredits: credits,
        totalDebits: debits,
        netRevenue: credits - debits,
        transactionsByCategory
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get inventory analytics
// @route   GET /api/admin/analytics/inventory
// @access  Private/Admin
exports.getInventoryAnalytics = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();
    
    const productsByCategory = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const averagePrice = await Product.aggregate([
      { $group: { _id: null, avgPrice: { $avg: '$basePrice' } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        productsByCategory,
        averagePrice: averagePrice[0]?.avgPrice || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

