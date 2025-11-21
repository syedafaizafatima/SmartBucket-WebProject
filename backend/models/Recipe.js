const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a recipe name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  ingredients: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    }
  }],
  instructions: {
    type: [String],
    required: [true, 'Please add instructions']
  },
  dietaryTags: {
    type: [String],
    enum: ['gluten-free', 'vegan', 'vegetarian', 'keto', 'paleo', 'dairy-free', 'nut-free', 'halal', 'kosher'],
    default: []
  },
  image: {
    type: String,
    default: ''
  },
  prepTime: {
    type: Number, // in minutes
    default: 0
  },
  cookTime: {
    type: Number, // in minutes
    default: 0
  },
  servings: {
    type: Number,
    default: 1
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);

