const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Please specify a product']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please specify a user']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: [true, 'Please add a review title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  comment: {
    type: String,
    required: [true, 'Please add a review comment'],
    maxlength: [1000, 'Comment cannot be more than 1000 characters']
  },
  images: {
    type: [String],
    default: []
  },
  helpful: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index to prevent duplicate reviews from same user on same product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Static method to get average rating
ReviewSchema.statics.getAverageRating = async function(productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 }
      }
    }
  ]);

  try {
    await this.model('Product').findByIdAndUpdate(productId, {
      rating: result[0]?.averageRating || 0,
      reviewCount: result[0]?.reviewCount || 0
    });
  } catch (err) {
    console.error('Error updating product rating:', err);
  }
};

// Update product rating after save
ReviewSchema.post('save', function() {
  this.constructor.getAverageRating(this.product);
});

// Update product rating after remove
ReviewSchema.post('remove', function() {
  this.constructor.getAverageRating(this.product);
});

module.exports = mongoose.model('Review', ReviewSchema);

