const express = require('express');
const router = express.Router();
const {
  getShoppingLists,
  getShoppingList,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
  generateAIShoppingList
} = require('../controllers/shoppingListController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getShoppingLists);
router.get('/:id', protect, getShoppingList);
router.post('/', protect, createShoppingList);
router.post('/generate-ai', protect, generateAIShoppingList);
router.put('/:id', protect, updateShoppingList);
router.delete('/:id', protect, deleteShoppingList);

module.exports = router;

