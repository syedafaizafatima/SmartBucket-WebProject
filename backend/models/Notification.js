const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please specify a user']
  },
  type: {
    type: String,
    enum: [
      'group_buy_joined',
      'group_buy_completed',
      'group_buy_expired',
      'subscription_reminder',
      'subscription_renewed',
      'price_drop',
      'review_helpful',
      'shopping_list_shared',
      'system',
      'other'
    ],
    required: [true, 'Please specify notification type']
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
    maxlength: [500, 'Message cannot be more than 500 characters']
  },
  link: {
    type: String,
    default: null
  },
  read: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date,
    default: null
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  expiresAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
NotificationSchema.index({ user: 1, read: 1, createdAt: -1 });
NotificationSchema.index({ expiresAt: 1 });

// Method to mark as read
NotificationSchema.methods.markAsRead = async function() {
  this.read = true;
  this.readAt = new Date();
  return await this.save();
};

// Static method to create notification
NotificationSchema.statics.createNotification = async function(data) {
  return await this.create(data);
};

// Static method to get unread count
NotificationSchema.statics.getUnreadCount = async function(userId) {
  return await this.countDocuments({ user: userId, read: false });
};

// Static method to mark all as read for user
NotificationSchema.statics.markAllAsRead = async function(userId) {
  return await this.updateMany(
    { user: userId, read: false },
    { read: true, readAt: new Date() }
  );
};

// Static method to delete old notifications
NotificationSchema.statics.deleteExpired = async function() {
  return await this.deleteMany({
    expiresAt: { $ne: null, $lt: new Date() }
  });
};

module.exports = mongoose.model('Notification', NotificationSchema);

