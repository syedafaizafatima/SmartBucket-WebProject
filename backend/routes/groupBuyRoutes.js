const express = require('express');
const router = express.Router();
const {
  getGroupBuys,
  getGroupBuy,
  createGroupBuy,
  updateGroupBuy,
  deleteGroupBuy,
  joinGroupBuy,
  leaveGroupBuy,
  getUserGroupBuys
} = require('../controllers/groupBuyController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getGroupBuys);
router.get('/:id', getGroupBuy);

// Protected routes
router.use(protect);
router.post('/', createGroupBuy);
router.put('/:id', updateGroupBuy);
router.delete('/:id', deleteGroupBuy);
router.post('/:id/join', joinGroupBuy);
router.post('/:id/leave', leaveGroupBuy);
router.get('/user/me', getUserGroupBuys);

module.exports = router;

