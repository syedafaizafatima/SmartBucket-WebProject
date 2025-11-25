const express = require('express');
const router = express.Router();
const {
  getNotifications,
  getNotification,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  getUnreadCount
} = require('../controllers/notificationController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// User routes
router.get('/', getNotifications);
router.get('/unread/count', getUnreadCount);
router.get('/:id', getNotification);
router.put('/:id/read', markAsRead);
router.put('/read-all', markAllAsRead);
router.delete('/:id', deleteNotification);
router.delete('/', deleteAllNotifications);

// Admin routes
router.post('/', authorize('admin'), createNotification);

module.exports = router;

