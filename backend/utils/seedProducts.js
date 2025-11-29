const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: 'Organic Bananas',
    description: 'Fresh organic bananas, perfect for smoothies and snacks. Rich in potassium and natural sugars.',
    category: 'fruits',
    brand: 'Fresh Farm',
    basePrice: 2.99,
    images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500'],
    dietaryTags: ['organic', 'vegan', 'gluten-free'],
    storePrices: [
      { storeName: 'Walmart', price: 2.49, availability: true },
      { storeName: 'Target', price: 2.79, availability: true },
      { storeName: 'Whole Foods', price: 3.29, availability: true }
    ],
    rating: 4.5,
    reviewCount: 120
  },
  {
    name: 'Fresh Spinach',
    description: 'Crisp, fresh spinach leaves. Perfect for salads, smoothies, and cooking.',
    category: 'vegetables',
    brand: 'Garden Fresh',
    basePrice: 3.49,
    images: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500'],
    dietaryTags: ['organic', 'vegan', 'vegetarian', 'gluten-free', 'keto'],
    storePrices: [
      { storeName: 'Walmart', price: 2.99, availability: true },
      { storeName: 'Target', price: 3.29, availability: true },
      { storeName: 'Whole Foods', price: 3.99, availability: true }
    ],
    rating: 4.3,
    reviewCount: 85
  },
  {
    name: 'Organic Whole Milk',
    description: 'Fresh, organic whole milk from grass-fed cows. Rich and creamy.',
    category: 'dairy',
    brand: 'Farm Fresh Dairy',
    basePrice: 4.99,
    images: ['https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500'],
    dietaryTags: ['organic', 'gluten-free'],
    storePrices: [
      { storeName: 'Walmart', price: 4.49, availability: true },
      { storeName: 'Target', price: 4.79, availability: true },
      { storeName: 'Whole Foods', price: 5.49, availability: false }
    ],
    rating: 4.7,
    reviewCount: 200
  },
  {
    name: 'Grass-Fed Ground Beef',
    description: 'Premium grass-fed ground beef, 80/20 lean. Perfect for burgers and meatballs.',
    category: 'meat',
    brand: 'Premium Meats',
    basePrice: 8.99,
    images: ['https://images.unsplash.com/photo-1603048297172-c92544744786?w=500'],
    dietaryTags: ['gluten-free', 'keto', 'paleo'],
    storePrices: [
      { storeName: 'Walmart', price: 7.99, availability: true },
      { storeName: 'Target', price: 8.49, availability: true },
      { storeName: 'Whole Foods', price: 9.99, availability: true }
    ],
    rating: 4.6,
    reviewCount: 150
  },
  {
    name: 'Artisan Sourdough Bread',
    description: 'Freshly baked artisan sourdough bread with a crispy crust and tangy flavor.',
    category: 'bakery',
    brand: 'Bakery Delights',
    basePrice: 5.49,
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500'],
    dietaryTags: ['organic'],
    storePrices: [
      { storeName: 'Walmart', price: 4.99, availability: true },
      { storeName: 'Target', price: 5.29, availability: true },
      { storeName: 'Whole Foods', price: 5.99, availability: true }
    ],
    rating: 4.8,
    reviewCount: 95
  },
  {
    name: 'Organic Green Tea',
    description: 'Premium organic green tea leaves. Rich in antioxidants and natural flavor.',
    category: 'beverages',
    brand: 'Tea Masters',
    basePrice: 6.99,
    images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500'],
    dietaryTags: ['organic', 'vegan', 'vegetarian', 'gluten-free', 'keto'],
    storePrices: [
      { storeName: 'Walmart', price: 5.99, availability: true },
      { storeName: 'Target', price: 6.49, availability: true },
      { storeName: 'Whole Foods', price: 7.49, availability: true }
    ],
    rating: 4.4,
    reviewCount: 180
  },
  {
    name: 'Organic Almonds',
    description: 'Raw, organic almonds. Great source of protein and healthy fats.',
    category: 'snacks',
    brand: 'Nutty Delights',
    basePrice: 9.99,
    images: ['https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500'],
    dietaryTags: ['organic', 'vegan', 'vegetarian', 'gluten-free', 'keto', 'paleo'],
    storePrices: [
      { storeName: 'Walmart', price: 8.99, availability: true },
      { storeName: 'Target', price: 9.49, availability: true },
      { storeName: 'Whole Foods', price: 10.99, availability: true }
    ],
    rating: 4.7,
    reviewCount: 250
  },
  {
    name: 'Frozen Organic Berries Mix',
    description: 'Frozen mix of organic strawberries, blueberries, and raspberries. Perfect for smoothies.',
    category: 'frozen',
    brand: 'Frozen Fresh',
    basePrice: 7.99,
    images: ['https://images.unsplash.com/photo-1615485925511-ef4f6b8c8c0e?w=500'],
    dietaryTags: ['organic', 'vegan', 'vegetarian', 'gluten-free'],
    storePrices: [
      { storeName: 'Walmart', price: 6.99, availability: true },
      { storeName: 'Target', price: 7.49, availability: true },
      { storeName: 'Whole Foods', price: 8.49, availability: true }
    ],
    rating: 4.5,
    reviewCount: 140
  },
  {
    name: 'Organic Quinoa',
    description: 'Premium organic quinoa. High in protein and perfect for salads and side dishes.',
    category: 'pantry',
    brand: 'Grain Goodness',
    basePrice: 5.99,
    images: ['https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500'],
    dietaryTags: ['organic', 'vegan', 'vegetarian', 'gluten-free'],
    storePrices: [
      { storeName: 'Walmart', price: 4.99, availability: true },
      { storeName: 'Target', price: 5.49, availability: true },
      { storeName: 'Whole Foods', price: 6.49, availability: true }
    ],
    rating: 4.6,
    reviewCount: 110
  },
  {
    name: 'Organic Avocados',
    description: 'Fresh, ripe organic avocados. Perfect for guacamole, salads, and toast.',
    category: 'fruits',
    brand: 'Fresh Farm',
    basePrice: 4.99,
    images: ['https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500'],
    dietaryTags: ['organic', 'vegan', 'vegetarian', 'gluten-free', 'keto', 'paleo'],
    storePrices: [
      { storeName: 'Walmart', price: 3.99, availability: true },
      { storeName: 'Target', price: 4.49, availability: true },
      { storeName: 'Whole Foods', price: 5.49, availability: true }
    ],
    rating: 4.8,
    reviewCount: 300
  },
  {
    name: 'Cage-Free Eggs',
    description: 'Fresh cage-free eggs from free-range hens. Rich in protein and nutrients.',
    category: 'dairy',
    brand: 'Happy Hens',
    basePrice: 5.49,
    images: ['https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500'],
    dietaryTags: ['gluten-free', 'keto', 'paleo'],
    storePrices: [
      { storeName: 'Walmart', price: 4.99, availability: true },
      { storeName: 'Target', price: 5.29, availability: true },
      { storeName: 'Whole Foods', price: 5.99, availability: true }
    ],
    rating: 4.7,
    reviewCount: 220
  },
  {
    name: 'Organic Broccoli',
    description: 'Fresh organic broccoli florets. High in vitamins and perfect for steaming or roasting.',
    category: 'vegetables',
    brand: 'Garden Fresh',
    basePrice: 3.99,
    images: ['https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=500'],
    dietaryTags: ['organic', 'vegan', 'vegetarian', 'gluten-free', 'keto'],
    storePrices: [
      { storeName: 'Walmart', price: 3.49, availability: true },
      { storeName: 'Target', price: 3.79, availability: true },
      { storeName: 'Whole Foods', price: 4.49, availability: true }
    ],
    rating: 4.4,
    reviewCount: 90
  }
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartbasket', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Seeded ${createdProducts.length} products successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedProducts();
}

module.exports = seedProducts;






