const express = require('express');
const router = express.Router();
const {
  getSubscriptions,
  getSubscription,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  pauseSubscription,
  resumeSubscription
} = require('../controllers/subscriptionController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getSubscriptions);
router.get('/:id', protect, getSubscription);
router.post('/', protect, createSubscription);
router.put('/:id', protect, updateSubscription);
router.put('/:id/pause', protect, pauseSubscription);
router.put('/:id/resume', protect, resumeSubscription);
router.delete('/:id', protect, deleteSubscription);

module.exports = router;

