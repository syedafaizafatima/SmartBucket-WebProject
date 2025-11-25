const mongoose = require('mongoose');

const GroupBuySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Please specify a product']
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please specify a creator']
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  targetQuantity: {
    type: Number,
    required: [true, 'Please specify target quantity'],
    min: [2, 'Target quantity must be at least 2']
  },
  currentQuantity: {
    type: Number,
    default: 0
  },
  originalPrice: {
    type: Number,
    required: [true, 'Please specify original price']
  },
  groupPrice: {
    type: Number,
    required: [true, 'Please specify group price']
  },
  savings: {
    type: Number,
    default: 0
  },
  savingsPercentage: {
    type: Number,
    default: 0
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled', 'expired'],
    default: 'active'
  },
  expiresAt: {
    type: Date,
    required: [true, 'Please specify expiration date']
  },
  deliveryDate: {
    type: Date
  },
  deliveryAddress: {
    type: String
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'online'],
    default: 'cash'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate savings before save
GroupBuySchema.pre('save', function(next) {
  if (this.originalPrice && this.groupPrice) {
    this.savings = this.originalPrice - this.groupPrice;
    this.savingsPercentage = ((this.savings / this.originalPrice) * 100).toFixed(2);
  }
  next();
});

// Method to check if group buy is full
GroupBuySchema.methods.isFull = function() {
  return this.currentQuantity >= this.targetQuantity;
};

// Method to check if group buy is expired
GroupBuySchema.methods.isExpired = function() {
  return new Date() > this.expiresAt;
};

// Method to add participant
GroupBuySchema.methods.addParticipant = async function(userId, quantity = 1) {
  // Check if user already joined
  const existingParticipant = this.participants.find(
    p => p.user.toString() === userId.toString()
  );

  if (existingParticipant) {
    existingParticipant.quantity += quantity;
  } else {
    this.participants.push({
      user: userId,
      quantity
    });
  }

  this.currentQuantity += quantity;

  // Check if target reached
  if (this.currentQuantity >= this.targetQuantity) {
    this.status = 'completed';
  }

  return await this.save();
};

// Method to remove participant
GroupBuySchema.methods.removeParticipant = async function(userId) {
  const participantIndex = this.participants.findIndex(
    p => p.user.toString() === userId.toString()
  );

  if (participantIndex > -1) {
    const participant = this.participants[participantIndex];
    this.currentQuantity -= participant.quantity;
    this.participants.splice(participantIndex, 1);

    // If was completed, revert to active
    if (this.status === 'completed' && this.currentQuantity < this.targetQuantity) {
      this.status = 'active';
    }

    return await this.save();
  }

  return this;
};

// Index for better query performance
GroupBuySchema.index({ status: 1, expiresAt: 1 });
GroupBuySchema.index({ product: 1 });
GroupBuySchema.index({ creator: 1 });

module.exports = mongoose.model('GroupBuy', GroupBuySchema);

