const express = require('express');
const router = express.Router();
const {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecommendedRecipes
} = require('../controllers/recipeController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getRecipes);
router.get('/recommended', protect, getRecommendedRecipes);
router.get('/:id', getRecipe);
router.post('/', protect, admin, createRecipe);
router.put('/:id', protect, admin, updateRecipe);
router.delete('/:id', protect, admin, deleteRecipe);

module.exports = router;

