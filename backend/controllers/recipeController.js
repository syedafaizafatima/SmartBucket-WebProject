const Recipe = require('../models/Recipe');
const User = require('../models/User');
const ShoppingList = require('../models/ShoppingList');

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
exports.getRecipes = async (req, res, next) => {
  try {
    const query = {};
    
    if (req.query.dietaryTags) {
      query.dietaryTags = { $in: req.query.dietaryTags.split(',') };
    }
    
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    const recipes = await Recipe.find(query);

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single recipe
// @route   GET /api/recipes/:id
// @access  Public
exports.getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('ingredients.productId');

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get recommended recipes
// @route   GET /api/recipes/recommended
// @access  Private
exports.getRecommendedRecipes = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Get user's active shopping lists to see what ingredients they have
    const lists = await ShoppingList.find({ userId: req.user.id });
    const productIds = [];
    lists.forEach(list => {
      list.items.forEach(item => {
        if (!productIds.includes(item.productId.toString())) {
          productIds.push(item.productId.toString());
        }
      });
    });

    // Find recipes that match user's dietary preferences and available ingredients
    const query = {};
    if (user.dietaryPreferences.length > 0) {
      query.dietaryTags = { $in: user.dietaryPreferences };
    }

    const recipes = await Recipe.find(query)
      .populate('ingredients.productId')
      .limit(10);

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create recipe
// @route   POST /api/recipes
// @access  Private/Admin
exports.createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create(req.body);

    res.status(201).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Private/Admin
exports.updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private/Admin
exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

