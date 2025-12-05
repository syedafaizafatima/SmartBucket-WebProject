const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const sampleProducts = [
  // ORIGINAL 12 PRODUCTS
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
  },

  // EXTRA PRODUCTS (ALL VALID CATEGORIES)

  {
    name: 'Greek Yogurt - Plain',
    description: 'Thick and creamy plain Greek yogurt, perfect for breakfast bowls and smoothies.',
    category: 'dairy',
    brand: 'YogoFarm',
    basePrice: 3.79,
    images: ['https://images.unsplash.com/photo-1514996937319-344454492b37?w=500'],
    dietaryTags: ['gluten-free', 'keto', 'vegetarian'],
    storePrices: [
      { storeName: 'Walmart', price: 3.49, availability: true },
      { storeName: 'Target', price: 3.59, availability: true },
      { storeName: 'Whole Foods', price: 3.99, availability: true }
    ],
    rating: 4.6,
    reviewCount: 132
  },
  {
    name: 'Strawberries',
    description: 'Sweet and juicy fresh strawberries, great for desserts and snacking.',
    category: 'fruits',
    brand: 'Berry Bliss',
    basePrice: 4.29,
    images: ['https://images.unsplash.com/photo-1437751068958-bb1d79c6c54b?w=500'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'organic'],
    storePrices: [
      { storeName: 'Walmart', price: 3.99, availability: true },
      { storeName: 'Target', price: 4.19, availability: true },
      { storeName: 'Whole Foods', price: 4.79, availability: true }
    ],
    rating: 4.7,
    reviewCount: 210
  },
  {
    name: 'Blueberries',
    description: 'Fresh blueberries packed with antioxidants and flavor.',
    category: 'fruits',
    brand: 'Berry Bliss',
    basePrice: 4.59,
    images: ['https://images.unsplash.com/photo-1560807707-8cc77767d783?w=500'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'organic'],
    storePrices: [
      { storeName: 'Walmart', price: 4.19, availability: true },
      { storeName: 'Target', price: 4.39, availability: true },
      { storeName: 'Whole Foods', price: 4.99, availability: true }
    ],
    rating: 4.8,
    reviewCount: 190
  },
  {
    name: 'Cherry Tomatoes',
    description: 'Sweet cherry tomatoes, perfect for salads and roasting.',
    category: 'vegetables',
    brand: 'Vine Fresh',
    basePrice: 2.99,
    images: ['https://images.unsplash.com/photo-1561136594-7f68413baa95?w=500'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'organic'],
    storePrices: [
      { storeName: 'Walmart', price: 2.49, availability: true },
      { storeName: 'Target', price: 2.79, availability: true },
      { storeName: 'Whole Foods', price: 3.19, availability: true }
    ],
    rating: 4.5,
    reviewCount: 110
  },
  {
    name: 'Baby Carrots',
    description: 'Crunchy baby carrots, ready to eat and perfect with dips.',
    category: 'vegetables',
    brand: 'Garden Fresh',
    basePrice: 2.49,
    images: ['https://images.unsplash.com/photo-1587731556938-38755b4803a6?w=500'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'keto'],
    storePrices: [
      { storeName: 'Walmart', price: 1.99, availability: true },
      { storeName: 'Target', price: 2.19, availability: true },
      { storeName: 'Whole Foods', price: 2.79, availability: true }
    ],
    rating: 4.4,
    reviewCount: 75
  },
  {
    name: 'Whole Wheat Bread',
    description: 'Soft whole wheat sandwich bread with added fiber.',
    category: 'bakery',
    brand: 'Daily Loaf',
    basePrice: 3.29,
    images: ['https://images.unsplash.com/photo-1542838132-92c53300491e?w=500'],
    dietaryTags: ['vegetarian'],
    storePrices: [
      { storeName: 'Walmart', price: 2.99, availability: true },
      { storeName: 'Target', price: 3.09, availability: true },
      { storeName: 'Whole Foods', price: 3.49, availability: true }
    ],
    rating: 4.2,
    reviewCount: 98
  },
  {
    name: 'Multigrain Bread',
    description: 'Hearty multigrain bread with seeds and whole grains.',
    category: 'bakery',
    brand: 'Daily Loaf',
    basePrice: 3.79,
    images: ['https://images.unsplash.com/photo-1514996937319-344454492b37?w=500'],
    dietaryTags: ['vegetarian'],
    storePrices: [
      { storeName: 'Walmart', price: 3.39, availability: true },
      { storeName: 'Target', price: 3.59, availability: true },
      { storeName: 'Whole Foods', price: 3.99, availability: true }
    ],
    rating: 4.5,
    reviewCount: 82
  },
  {
    name: 'Sparkling Water - Lime',
    description: 'Refreshing lime-flavored sparkling water with no added sugar.',
    category: 'beverages',
    brand: 'Bubbly Spring',
    basePrice: 5.49,
    images: ['https://images.unsplash.com/photo-1546177461-79dfec0b0928?w=500'],
    dietaryTags: ['vegan', 'gluten-free', 'keto'],
    storePrices: [
      { storeName: 'Walmart', price: 4.99, availability: true },
      { storeName: 'Target', price: 5.19, availability: true },
      { storeName: 'Whole Foods', price: 5.69, availability: true }
    ],
    rating: 4.3,
    reviewCount: 65
  },
  {
    name: 'Cold Brew Coffee Concentrate',
    description: 'Smooth cold brew coffee concentrate, just add water or milk.',
    category: 'beverages',
    brand: 'Midnight Roast',
    basePrice: 7.99,
    images: ['https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500'],
    dietaryTags: ['vegan', 'gluten-free', 'keto'],
    storePrices: [
      { storeName: 'Walmart', price: 7.49, availability: true },
      { storeName: 'Target', price: 7.79, availability: true },
      { storeName: 'Whole Foods', price: 8.49, availability: true }
    ],
    rating: 4.6,
    reviewCount: 143
  },
  {
    name: 'Kettle Cooked Potato Chips - Sea Salt',
    description: 'Crispy kettle-cooked potato chips seasoned with sea salt.',
    category: 'snacks',
    brand: 'Crisp Crunch',
    basePrice: 3.49,
    images: ['https://images.unsplash.com/photo-1585238342028-1f400e1341ab?w=500'],
    dietaryTags: ['gluten-free', 'vegetarian'],
    storePrices: [
      { storeName: 'Walmart', price: 2.99, availability: true },
      { storeName: 'Target', price: 3.19, availability: true },
      { storeName: 'Whole Foods', price: 3.79, availability: true }
    ],
    rating: 4.3,
    reviewCount: 156
  },
  {
    name: 'Trail Mix - Nuts & Dried Fruit',
    description: 'Energy-boosting trail mix with nuts, seeds, and dried fruit.',
    category: 'snacks',
    brand: 'Nutty Trail',
    basePrice: 6.49,
    images: ['https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500'],
    dietaryTags: ['vegetarian', 'gluten-free'],
    storePrices: [
      { storeName: 'Walmart', price: 5.99, availability: true },
      { storeName: 'Target', price: 6.29, availability: true },
      { storeName: 'Whole Foods', price: 6.99, availability: true }
    ],
    rating: 4.5,
    reviewCount: 121
  },
  {
    name: 'Organic Peanut Butter',
    description: 'Creamy organic peanut butter with no added sugar.',
    category: 'pantry',
    brand: 'Spread Joy',
    basePrice: 5.99,
    images: ['https://images.unsplash.com/photo-1548943487-a2e4e43b4856?w=500'],
    dietaryTags: ['vegetarian', 'gluten-free', 'keto'],
    storePrices: [
      { storeName: 'Walmart', price: 5.49, availability: true },
      { storeName: 'Target', price: 5.79, availability: true },
      { storeName: 'Whole Foods', price: 6.29, availability: true }
    ],
    rating: 4.7,
    reviewCount: 174
  },
  {
    name: 'Rolled Oats',
    description: 'Whole grain rolled oats for oatmeal, baking, and granola.',
    category: 'pantry',
    brand: 'Morning Grains',
    basePrice: 4.49,
    images: ['https://images.unsplash.com/photo-1514996937319-344454492b37?w=500'],
    dietaryTags: ['vegan', 'vegetarian'],
    storePrices: [
      { storeName: 'Walmart', price: 3.99, availability: true },
      { storeName: 'Target', price: 4.19, availability: true },
      { storeName: 'Whole Foods', price: 4.69, availability: true }
    ],
    rating: 4.4,
    reviewCount: 97
  },
  {
    name: 'Brown Rice - Long Grain',
    description: 'Long grain brown rice with a nutty flavor and firm texture.',
    category: 'pantry',
    brand: 'Grain Goodness',
    basePrice: 3.99,
    images: ['https://images.unsplash.com/photo-1518976024611-28bf4b48222e?w=500'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free'],
    storePrices: [
      { storeName: 'Walmart', price: 3.49, availability: true },
      { storeName: 'Target', price: 3.69, availability: true },
      { storeName: 'Whole Foods', price: 4.19, availability: true }
    ],
    rating: 4.3,
    reviewCount: 84
  },
  {
    name: 'Chicken Breast Fillets',
    description: 'Boneless, skinless chicken breast fillets, lean and versatile.',
    category: 'meat',
    brand: 'Premium Meats',
    basePrice: 9.99,
    images: ['https://images.unsplash.com/photo-1604908176997-1251884b08a3?w=500'],
    dietaryTags: ['gluten-free', 'keto', 'paleo'],
    storePrices: [
      { storeName: 'Walmart', price: 8.99, availability: true },
      { storeName: 'Target', price: 9.49, availability: true },
      { storeName: 'Whole Foods', price: 10.49, availability: true }
    ],
    rating: 4.6,
    reviewCount: 165
  },
  {
    name: 'Salmon Fillet',
    description: 'Fresh Atlantic salmon fillet, rich in omega-3 fatty acids.',
    category: 'meat',
    brand: 'Ocean Catch',
    basePrice: 13.99,
    images: ['https://images.unsplash.com/photo-1615937691194-96f1628985f3?w=500'],
    dietaryTags: ['gluten-free', 'keto', 'paleo'],
    storePrices: [
      { storeName: 'Walmart', price: 12.99, availability: true },
      { storeName: 'Target', price: 13.49, availability: true },
      { storeName: 'Whole Foods', price: 14.49, availability: true }
    ],
    rating: 4.8,
    reviewCount: 189
  },
  {
    name: 'Turkey Slices - Deli Style',
    description: 'Lean deli-style turkey slices, perfect for sandwiches and wraps.',
    category: 'meat',
    brand: 'Deli Choice',
    basePrice: 6.49,
    images: ['https://images.unsplash.com/photo-1604908176997-1251884b08a3?w=500'],
    dietaryTags: ['gluten-free', 'keto'],
    storePrices: [
      { storeName: 'Walmart', price: 5.99, availability: true },
      { storeName: 'Target', price: 6.19, availability: true },
      { storeName: 'Whole Foods', price: 6.79, availability: true }
    ],
    rating: 4.4,
    reviewCount: 103
  },
  {
    name: 'Mozzarella Cheese Block',
    description: 'Mild and creamy mozzarella cheese, great for pizzas and salads.',
    category: 'dairy',
    brand: 'Cheese Craft',
    basePrice: 5.49,
    images: ['https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=500'],
    dietaryTags: ['vegetarian', 'gluten-free', 'keto'],
    storePrices: [
      { storeName: 'Walmart', price: 4.99, availability: true },
      { storeName: 'Target', price: 5.19, availability: true },
      { storeName: 'Whole Foods', price: 5.79, availability: true }
    ],
    rating: 4.7,
    reviewCount: 134
  },
  {
    name: 'Sharp Cheddar Cheese',
    description: 'Aged sharp cheddar cheese with bold flavor.',
    category: 'dairy',
    brand: 'Cheese Craft',
    basePrice: 5.99,
    images: ['https://images.unsplash.com/photo-1604908176997-1251884b08a3?w=500'],
    dietaryTags: ['vegetarian', 'gluten-free', 'keto'],
    storePrices: [
      { storeName: 'Walmart', price: 5.49, availability: true },
      { storeName: 'Target', price: 5.79, availability: true },
      { storeName: 'Whole Foods', price: 6.29, availability: true }
    ],
    rating: 4.8,
    reviewCount: 156
  },
  {
    name: 'Vanilla Almond Milk',
    description: 'Dairy-free vanilla-flavored almond milk, perfect for cereal and smoothies.',
    category: 'beverages',
    brand: 'Almond Dream',
    basePrice: 3.99,
    images: ['https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free'],
    storePrices: [
      { storeName: 'Walmart', price: 3.49, availability: true },
      { storeName: 'Target', price: 3.69, availability: true },
      { storeName: 'Whole Foods', price: 4.19, availability: true }
    ],
    rating: 4.5,
    reviewCount: 142
  },
  {
    name: 'Coconut Water',
    description: 'Natural coconut water for hydration and refreshment.',
    category: 'beverages',
    brand: 'Island Sip',
    basePrice: 2.99,
    images: ['https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free'],
    storePrices: [
      { storeName: 'Walmart', price: 2.49, availability: true },
      { storeName: 'Target', price: 2.69, availability: true },
      { storeName: 'Whole Foods', price: 2.99, availability: true }
    ],
    rating: 4.2,
    reviewCount: 88
  },
  {
    name: 'Frozen Mixed Vegetables',
    description: 'A blend of frozen peas, carrots, corn, and green beans.',
    category: 'frozen',
    brand: 'Freezer Fresh',
    basePrice: 3.49,
    images: ['https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=500'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free'],
    storePrices: [
      { storeName: 'Walmart', price: 2.99, availability: true },
      { storeName: 'Target', price: 3.19, availability: true },
      { storeName: 'Whole Foods', price: 3.69, availability: true }
    ],
    rating: 4.3,
    reviewCount: 77
  },
  {
    name: 'Frozen French Fries',
    description: 'Crispy frozen French fries, ready for oven or air fryer.',
    category: 'frozen',
    brand: 'Crispy Bites',
    basePrice: 4.49,
    images: ['https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500'],
    dietaryTags: ['vegetarian'],
    storePrices: [
      { storeName: 'Walmart', price: 3.99, availability: true },
      { storeName: 'Target', price: 4.19, availability: true },
      { storeName: 'Whole Foods', price: 4.69, availability: true }
    ],
    rating: 4.1,
    reviewCount: 102
  },
  {
    name: 'Frozen Margherita Pizza',
    description: 'Thin-crust margherita pizza with tomato, basil, and mozzarella.',
    category: 'frozen',
    brand: 'Oven Ready',
    basePrice: 7.99,
    images: ['https://images.unsplash.com/photo-1542838132-92c53300491e?w=500'],
    dietaryTags: ['vegetarian'],
    storePrices: [
      { storeName: 'Walmart', price: 7.49, availability: true },
      { storeName: 'Target', price: 7.79, availability: true },
      { storeName: 'Whole Foods', price: 8.49, availability: true }
    ],
    rating: 4.4,
    reviewCount: 131
  },
  {
    name: 'Granola Clusters - Honey & Almond',
    description: 'Crunchy granola clusters with honey and toasted almonds.',
    category: 'snacks',
    brand: 'Crunchy Morning',
    basePrice: 5.49,
    images: ['https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500'],
    dietaryTags: ['vegetarian'],
    storePrices: [
      { storeName: 'Walmart', price: 4.99, availability: true },
      { storeName: 'Target', price: 5.19, availability: true },
      { storeName: 'Whole Foods', price: 5.69, availability: true }
    ],
    rating: 4.5,
    reviewCount: 119
  },
  {
    name: 'Chia Seeds',
    description: 'Nutrient-dense chia seeds, great for puddings, smoothies, and baking.',
    category: 'pantry',
    brand: 'Super Seeds',
    basePrice: 6.49,
    images: ['https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?w=500'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'keto'],
    storePrices: [
      { storeName: 'Walmart', price: 5.99, availability: true },
      { storeName: 'Target', price: 6.19, availability: true },
      { storeName: 'Whole Foods', price: 6.79, availability: true }
    ],
    rating: 4.6,
    reviewCount: 98
  },
  {
    name: 'Canned Black Beans',
    description: 'Ready-to-eat canned black beans, rich in fiber and protein.',
    category: 'pantry',
    brand: 'Pantry Pro',
    basePrice: 1.49,
    images: ['https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=500'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free'],
    storePrices: [
      { storeName: 'Walmart', price: 1.19, availability: true },
      { storeName: 'Target', price: 1.29, availability: true },
      { storeName: 'Whole Foods', price: 1.59, availability: true }
    ],
    rating: 4.3,
    reviewCount: 73
  },
  {
    name: 'Tomato Basil Pasta Sauce',
    description: 'Slow-simmered tomato basil pasta sauce with a rich flavor.',
    category: 'pantry',
    brand: 'Nonna’s Kitchen',
    basePrice: 3.99,
    images: ['https://images.unsplash.com/photo-1543353071-873f17a7a088?w=500'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free'],
    storePrices: [
      { storeName: 'Walmart', price: 3.49, availability: true },
      { storeName: 'Target', price: 3.69, availability: true },
      { storeName: 'Whole Foods', price: 4.29, availability: true }
    ],
    rating: 4.4,
    reviewCount: 128
  },
  {
    name: 'Hummus - Classic',
    description: 'Smooth and creamy classic hummus made with chickpeas and tahini.',
    category: 'snacks',
    brand: 'Mediterranean Delight',
    basePrice: 4.49,
    images: ['https://images.unsplash.com/photo-1615937669766-76c3c5c9e6c3?w=500'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free'],
    storePrices: [
      { storeName: 'Walmart', price: 3.99, availability: true },
      { storeName: 'Target', price: 4.19, availability: true },
      { storeName: 'Whole Foods', price: 4.69, availability: true }
    ],
    rating: 4.6,
    reviewCount: 141
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
