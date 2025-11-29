const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

dotenv.config();

const seedTransactions = async () => {
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

    // Clear existing transactions for this user
    await Transaction.deleteMany({ userId: user._id });
    console.log('Cleared existing transactions');

    // Create sample transactions
    const now = new Date();
    const sampleTransactions = [
      {
        userId: user._id,
        type: 'debit',
        amount: 125.50,
        description: 'Weekly grocery shopping',
        category: 'groceries',
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        userId: user._id,
        type: 'debit',
        amount: 29.99,
        description: 'Monthly subscription - Premium Plan',
        category: 'subscription',
        date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        userId: user._id,
        type: 'credit',
        amount: 50.00,
        description: 'Refund for returned items',
        category: 'refund',
        date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      },
      {
        userId: user._id,
        type: 'debit',
        amount: 89.75,
        description: 'Online purchase - Electronics',
        category: 'purchase',
        date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
      },
      {
        userId: user._id,
        type: 'debit',
        amount: 45.20,
        description: 'Grocery shopping',
        category: 'groceries',
        date: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000) // 14 days ago
      },
      {
        userId: user._id,
        type: 'credit',
        amount: 200.00,
        description: 'Salary deposit',
        category: 'other',
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        userId: user._id,
        type: 'debit',
        amount: 15.99,
        description: 'Streaming service subscription',
        category: 'subscription',
        date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },
      {
        userId: user._id,
        type: 'debit',
        amount: 67.30,
        description: 'Weekly grocery shopping',
        category: 'groceries',
        date: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000) // 9 days ago
      }
    ];

    const createdTransactions = await Transaction.insertMany(sampleTransactions);
    console.log(`Seeded ${createdTransactions.length} transactions successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding transactions:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedTransactions();
}

module.exports = seedTransactions;

