const ShoppingList = require('../models/ShoppingList');

// @desc    Get all shopping lists for user
// @route   GET /api/shopping-lists
// @access  Private
exports.getShoppingLists = async (req, res, next) => {
  try {
    const lists = await ShoppingList.find({ userId: req.user.id })
      .populate('items.productId');

    res.status(200).json({
      success: true,
      count: lists.length,
      data: lists
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single shopping list
// @route   GET /api/shopping-lists/:id
// @access  Private
exports.getShoppingList = async (req, res, next) => {
  try {
    const list = await ShoppingList.findById(req.params.id)
      .populate('items.productId');

    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Shopping list not found'
      });
    }

    // Check if user owns the list or it's shared with them
    if (list.userId.toString() !== req.user.id && !list.sharedWith.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this list'
      });
    }

    res.status(200).json({
      success: true,
      data: list
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create shopping list
// @route   POST /api/shopping-lists
// @access  Private
exports.createShoppingList = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    const list = await ShoppingList.create(req.body);

    res.status(201).json({
      success: true,
      data: list
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Generate AI shopping list
// @route   POST /api/shopping-lists/generate-ai
// @access  Private
exports.generateAIShoppingList = async (req, res, next) => {
  try {
    // Basic AI logic - can be enhanced later
    // For now, generate based on user's dietary preferences and shopping history
    const User = require('../models/User');
    const Product = require('../models/Product');
    
    const user = await User.findById(req.user.id);
    const { preferences } = req.body;

    // Get products matching dietary preferences
    const query = {};
    if (user.dietaryPreferences.length > 0) {
      query.dietaryTags = { $in: user.dietaryPreferences };
    }

    const products = await Product.find(query).limit(10);

    const list = await ShoppingList.create({
      userId: req.user.id,
      name: req.body.name || 'AI Generated List',
      items: products.map(product => ({
        productId: product._id,
        quantity: 1
      }))
    });

    res.status(201).json({
      success: true,
      data: list
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update shopping list
// @route   PUT /api/shopping-lists/:id
// @access  Private
exports.updateShoppingList = async (req, res, next) => {
  try {
    let list = await ShoppingList.findById(req.params.id);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Shopping list not found'
      });
    }

    // Check ownership
    if (list.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    list = await ShoppingList.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: list
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete shopping list
// @route   DELETE /api/shopping-lists/:id
// @access  Private
exports.deleteShoppingList = async (req, res, next) => {
  try {
    const list = await ShoppingList.findById(req.params.id);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Shopping list not found'
      });
    }

    // Check ownership
    if (list.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await list.deleteOne();

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

