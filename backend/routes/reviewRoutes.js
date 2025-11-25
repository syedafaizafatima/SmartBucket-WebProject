const express = require('express');
const router = express.Router();
const {
  getProductReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  markHelpful,
  getUserReviews
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/product/:productId', getProductReviews);
router.get('/:id', getReview);

// Protected routes
router.use(protect);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
router.put('/:id/helpful', markHelpful);
router.get('/user/me', getUserReviews);

module.exports = router;

