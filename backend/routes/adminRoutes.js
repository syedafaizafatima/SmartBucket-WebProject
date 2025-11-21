const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getUserAnalytics,
  getSalesAnalytics,
  getInventoryAnalytics
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.use(protect);
router.use(admin);

router.get('/dashboard', getDashboardStats);
router.get('/analytics/users', getUserAnalytics);
router.get('/analytics/sales', getSalesAnalytics);
router.get('/analytics/inventory', getInventoryAnalytics);

module.exports = router;

