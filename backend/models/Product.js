const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['fruits', 'vegetables', 'dairy', 'meat', 'bakery', 'beverages', 'snacks', 'frozen', 'pantry', 'other']
  },
  brand: {
    type: String,
    default: 'Generic'
  },
  basePrice: {
    type: Number,
    required: [true, 'Please add a base price']
  },
  images: {
    type: [String],
    default: []
  },
  dietaryTags: {
    type: [String],
    enum: ['gluten-free', 'vegan', 'vegetarian', 'keto', 'paleo', 'dairy-free', 'nut-free', 'halal', 'kosher', 'organic'],
    default: []
  },
  // Store prices from different platforms
  storePrices: [{
    storeName: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    availability: {
      type: Boolean,
      default: true
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  }],
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

// Get best price
ProductSchema.methods.getBestPrice = function() {
  const availablePrices = this.storePrices
    .filter(sp => sp.availability)
    .map(sp => sp.price);
  
  return availablePrices.length > 0 ? Math.min(...availablePrices) : this.basePrice;
};

module.exports = mongoose.model('Product', ProductSchema);

