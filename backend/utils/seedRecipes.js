const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('../models/Recipe');
const Product = require('../models/Product');

dotenv.config();

const seedRecipes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartbasket', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Get products to use as ingredients
    const products = await Product.find().limit(20);
    if (products.length === 0) {
      console.log('No products found. Please seed products first.');
      process.exit(1);
    }

    // Clear existing recipes
    await Recipe.deleteMany({});
    console.log('Cleared existing recipes');

    const sampleRecipes = [
      {
        name: 'Fresh Fruit Smoothie Bowl',
        description: 'A healthy and refreshing smoothie bowl packed with vitamins and natural sweetness.',
        ingredients: [
          { productId: products[0]?._id || products[0], name: 'Bananas', quantity: '2 medium' },
          { productId: products[1]?._id || products[1], name: 'Spinach', quantity: '1 cup' },
          { productId: products[2]?._id || products[2], name: 'Milk', quantity: '1/2 cup' }
        ],
        instructions: [
          'Blend bananas, spinach, and milk until smooth',
          'Pour into a bowl',
          'Top with fresh fruits and granola',
          'Serve immediately'
        ],
        dietaryTags: ['vegan', 'vegetarian', 'gluten-free'],
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500',
        prepTime: 10,
        cookTime: 0,
        servings: 2,
        rating: 4.5,
        reviewCount: 45
      },
      {
        name: 'Garden Fresh Salad',
        description: 'A crisp and colorful salad with fresh vegetables and a light dressing.',
        ingredients: [
          { productId: products[1]?._id || products[1], name: 'Spinach', quantity: '2 cups' },
          { productId: products[3]?._id || products[3], name: 'Tomatoes', quantity: '2 medium' },
          { productId: products[4]?._id || products[4], name: 'Cucumber', quantity: '1 medium' }
        ],
        instructions: [
          'Wash and chop all vegetables',
          'Combine in a large bowl',
          'Add your favorite dressing',
          'Toss gently and serve'
        ],
        dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'keto'],
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
        prepTime: 15,
        cookTime: 0,
        servings: 4,
        rating: 4.3,
        reviewCount: 32
      },
      {
        name: 'Creamy Pasta Primavera',
        description: 'A delicious pasta dish with fresh vegetables in a creamy sauce.',
        ingredients: [
          { productId: products[5]?._id || products[5], name: 'Pasta', quantity: '250g' },
          { productId: products[2]?._id || products[2], name: 'Milk', quantity: '1 cup' },
          { productId: products[3]?._id || products[3], name: 'Tomatoes', quantity: '3 medium' }
        ],
        instructions: [
          'Cook pasta according to package directions',
          'Sauté vegetables in a pan',
          'Add milk and seasonings',
          'Combine with pasta and serve hot'
        ],
        dietaryTags: ['vegetarian'],
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500',
        prepTime: 10,
        cookTime: 20,
        servings: 4,
        rating: 4.7,
        reviewCount: 89
      },
      {
        name: 'Grilled Chicken Salad',
        description: 'A protein-packed salad with grilled chicken and fresh greens.',
        ingredients: [
          { productId: products[6]?._id || products[6], name: 'Chicken Breast', quantity: '2 pieces' },
          { productId: products[1]?._id || products[1], name: 'Spinach', quantity: '3 cups' },
          { productId: products[3]?._id || products[3], name: 'Tomatoes', quantity: '2 medium' }
        ],
        instructions: [
          'Season and grill chicken until cooked through',
          'Let rest and slice',
          'Arrange on bed of fresh spinach',
          'Add tomatoes and your favorite dressing'
        ],
        dietaryTags: ['gluten-free', 'keto'],
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
        prepTime: 15,
        cookTime: 15,
        servings: 2,
        rating: 4.6,
        reviewCount: 67
      },
      {
        name: 'Vegetable Stir Fry',
        description: 'Quick and healthy stir fry with mixed vegetables and savory sauce.',
        ingredients: [
          { productId: products[1]?._id || products[1], name: 'Spinach', quantity: '2 cups' },
          { productId: products[4]?._id || products[4], name: 'Cucumber', quantity: '1 medium' },
          { productId: products[3]?._id || products[3], name: 'Tomatoes', quantity: '2 medium' }
        ],
        instructions: [
          'Heat oil in a large pan',
          'Add vegetables and stir fry for 5 minutes',
          'Add sauce and continue cooking',
          'Serve hot over rice or noodles'
        ],
        dietaryTags: ['vegan', 'vegetarian', 'gluten-free'],
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500',
        prepTime: 10,
        cookTime: 10,
        servings: 3,
        rating: 4.4,
        reviewCount: 54
      },
      {
        name: 'Berry Parfait',
        description: 'Layered yogurt parfait with fresh berries and granola.',
        ingredients: [
          { productId: products[2]?._id || products[2], name: 'Milk', quantity: '1 cup' },
          { productId: products[0]?._id || products[0], name: 'Bananas', quantity: '1 medium' },
          { productId: products[7]?._id || products[7], name: 'Berries', quantity: '1 cup' }
        ],
        instructions: [
          'Layer yogurt in a glass',
          'Add fresh berries',
          'Top with granola',
          'Repeat layers and serve'
        ],
        dietaryTags: ['vegetarian', 'gluten-free'],
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500',
        prepTime: 10,
        cookTime: 0,
        servings: 2,
        rating: 4.8,
        reviewCount: 78
      },
      {
        name: 'Avocado Toast Deluxe',
        description: 'Simple yet delicious avocado toast with fresh toppings.',
        ingredients: [
          { productId: products[8]?._id || products[8], name: 'Bread', quantity: '2 slices' },
          { productId: products[9]?._id || products[9], name: 'Avocado', quantity: '1 medium' },
          { productId: products[3]?._id || products[3], name: 'Tomatoes', quantity: '1 medium' }
        ],
        instructions: [
          'Toast bread until golden',
          'Mash avocado with lemon and salt',
          'Spread on toast',
          'Top with sliced tomatoes and enjoy'
        ],
        dietaryTags: ['vegan', 'vegetarian'],
        image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500',
        prepTime: 5,
        cookTime: 5,
        servings: 2,
        rating: 4.5,
        reviewCount: 92
      },
      {
        name: 'Quinoa Power Bowl',
        description: 'Nutritious quinoa bowl with vegetables and protein.',
        ingredients: [
          { productId: products[10]?._id || products[10], name: 'Quinoa', quantity: '1 cup' },
          { productId: products[1]?._id || products[1], name: 'Spinach', quantity: '2 cups' },
          { productId: products[3]?._id || products[3], name: 'Tomatoes', quantity: '2 medium' }
        ],
        instructions: [
          'Cook quinoa according to package',
          'Sauté vegetables',
          'Combine quinoa and vegetables',
          'Add dressing and serve'
        ],
        dietaryTags: ['vegan', 'vegetarian', 'gluten-free'],
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
        prepTime: 15,
        cookTime: 20,
        servings: 3,
        rating: 4.6,
        reviewCount: 56
      }
    ];

    // Insert sample recipes
    const createdRecipes = await Recipe.insertMany(sampleRecipes);
    console.log(`Seeded ${createdRecipes.length} recipes successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding recipes:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedRecipes();
}

module.exports = seedRecipes;

