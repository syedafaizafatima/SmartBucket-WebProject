const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Subscription = require('../models/Subscription');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config();

const seedSubscriptions = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartbasket', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Get a user (or create one if none exists)
    let user = await User.findOne();
    if (!user) {
      console.log('No users found. Please create a user first by registering.');
      process.exit(1);
    }

    // Get products
    const products = await Product.find().limit(10);
    if (products.length === 0) {
      console.log('No products found. Please seed products first.');
      process.exit(1);
    }

    // Clear existing subscriptions for this user
    await Subscription.deleteMany({ userId: user._id });
    console.log('Cleared existing subscriptions');

    // Create sample subscriptions
    const nextDelivery1 = new Date();
    nextDelivery1.setDate(nextDelivery1.getDate() + 7);

    const nextDelivery2 = new Date();
    nextDelivery2.setDate(nextDelivery2.getDate() + 14);

    const nextDelivery3 = new Date();
    nextDelivery3.setMonth(nextDelivery3.getMonth() + 1);

    const sampleSubscriptions = [
      {
        userId: user._id,
        items: [
          { productId: products[0]._id, quantity: 2 },
          { productId: products[1]._id, quantity: 1 }
        ],
        frequency: 'weekly',
        nextDelivery: nextDelivery1,
        status: 'active',
        deliveryAddress: '123 Main St, City, State 12345',
        paymentMethod: 'credit-card',
        discount: 10
      },
      {
        userId: user._id,
        items: [
          { productId: products[2]._id, quantity: 3 },
          { productId: products[3]._id, quantity: 2 }
        ],
        frequency: 'biweekly',
        nextDelivery: nextDelivery2,
        status: 'active',
        deliveryAddress: '123 Main St, City, State 12345',
        paymentMethod: 'debit-card',
        discount: 5
      },
      {
        userId: user._id,
        items: [
          { productId: products[4]._id, quantity: 1 },
          { productId: products[5]._id, quantity: 4 }
        ],
        frequency: 'monthly',
        nextDelivery: nextDelivery3,
        status: 'active',
        deliveryAddress: '123 Main St, City, State 12345',
        paymentMethod: 'paypal',
        discount: 15
      }
    ];

    const createdSubscriptions = await Subscription.insertMany(sampleSubscriptions);
    console.log(`Seeded ${createdSubscriptions.length} subscriptions successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding subscriptions:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedSubscriptions();
}

module.exports = seedSubscriptions;

