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
        description:
          '• Healthy, refreshing smoothie bowl for busy mornings\n' +
          '• Uses simple fruit, greens, and milk you likely already have\n' +
          '• Naturally sweet, no added sugar needed\n' +
          '• Ready in about 10 minutes',
        ingredients: [
          { productId: products[0]?._id || products[0], name: 'Bananas', quantity: '2 medium' },
          { productId: products[1]?._id || products[1], name: 'Spinach', quantity: '1 cup' },
          { productId: products[2]?._id || products[2], name: 'Milk', quantity: '1/2 cup' }
        ],
        instructions: [
          'Peel and slice the bananas.',
          'Add bananas, spinach, and milk to a blender.',
          'Blend until completely smooth and creamy.',
          'Pour into bowls and top with fresh fruits and granola.',
          'Serve immediately while cold.'
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
        description:
          '• Light, crisp salad built around fresh leafy greens\n' +
          '• Easy way to use up extra vegetables in the fridge\n' +
          '• Works as a side dish or a light main\n' +
          '• Customizable with any dressing you like',
        ingredients: [
          { productId: products[1]?._id || products[1], name: 'Spinach', quantity: '2 cups' },
          { productId: products[3]?._id || products[3], name: 'Tomatoes', quantity: '2 medium' },
          { productId: products[4]?._id || products[4], name: 'Cucumber', quantity: '1 medium' }
        ],
        instructions: [
          'Wash and dry all vegetables thoroughly.',
          'Chop spinach, tomatoes, and cucumber into bite-sized pieces.',
          'Add everything to a large mixing bowl.',
          'Drizzle with your favorite dressing and toss gently.',
          'Serve immediately for best texture.'
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
        description:
          '• Comforting pasta dish loaded with vegetables\n' +
          '• Simple creamy sauce made from basic ingredients\n' +
          '• Great choice for weeknight family dinners\n' +
          '• Easy to adapt with whatever vegetables you have',
        ingredients: [
          { productId: products[5]?._id || products[5], name: 'Pasta', quantity: '250g' },
          { productId: products[2]?._id || products[2], name: 'Milk', quantity: '1 cup' },
          { productId: products[3]?._id || products[3], name: 'Tomatoes', quantity: '3 medium' }
        ],
        instructions: [
          'Cook pasta in salted boiling water according to package instructions.',
          'While pasta cooks, sauté chopped tomatoes and other vegetables in a pan with a bit of oil.',
          'Stir in milk and season with salt, pepper, and herbs.',
          'Simmer the sauce until slightly thickened.',
          'Drain pasta, combine with the sauce, and serve hot.'
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
        description:
          '• High-protein salad with fresh greens and juicy chicken\n' +
          '• Works as a full meal, not just a side\n' +
          '• Easy to meal-prep for lunches\n' +
          '• Can be topped with any dressing or vinaigrette you prefer',
        ingredients: [
          { productId: products[6]?._id || products[6], name: 'Chicken Breast', quantity: '2 pieces' },
          { productId: products[1]?._id || products[1], name: 'Spinach', quantity: '3 cups' },
          { productId: products[3]?._id || products[3], name: 'Tomatoes', quantity: '2 medium' }
        ],
        instructions: [
          'Season chicken breasts with salt, pepper, and your favorite spices.',
          'Grill or pan-cook the chicken until fully cooked and golden.',
          'Let the chicken rest for a few minutes, then slice thinly.',
          'Arrange spinach and chopped tomatoes in a bowl.',
          'Top with sliced chicken and your dressing of choice.'
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
        description:
          '• Quick stir fry using everyday vegetables\n' +
          '• Great base recipe to pair with rice or noodles\n' +
          '• Easy way to add more vegetables into your day\n' +
          '• Done in about 20 minutes from start to finish',
        ingredients: [
          { productId: products[1]?._id || products[1], name: 'Spinach', quantity: '2 cups' },
          { productId: products[4]?._id || products[4], name: 'Cucumber', quantity: '1 medium, sliced' },
          { productId: products[3]?._id || products[3], name: 'Tomatoes', quantity: '2 medium, chopped' }
        ],
        instructions: [
          'Heat a tablespoon of oil in a large pan or wok.',
          'Add chopped vegetables and stir fry over high heat for about 5 minutes.',
          'Add soy sauce or your preferred stir fry sauce.',
          'Cook for another 3–5 minutes until vegetables are tender-crisp.',
          'Serve hot over cooked rice or noodles.'
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
        description:
          '• Simple layered dessert or snack with yogurt and berries\n' +
          '• Looks fancy but uses very few ingredients\n' +
          '• Great way to use mixed frozen or fresh berries\n' +
          '• Can be prepped in advance and chilled',
        ingredients: [
          { productId: products[2]?._id || products[2], name: 'Milk / Yogurt Base', quantity: '1 cup' },
          { productId: products[0]?._id || products[0], name: 'Bananas', quantity: '1 medium, sliced' },
          { productId: products[7]?._id || products[7], name: 'Berries', quantity: '1 cup' }
        ],
        instructions: [
          'Add a spoonful of yogurt or creamy base to the bottom of a glass.',
          'Layer in sliced bananas and berries.',
          'Add another layer of yogurt and repeat the fruit layers.',
          'Top with granola or nuts if desired.',
          'Serve immediately or chill for later.'
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
        description:
          '• Upgraded avocado toast with fresh toppings\n' +
          '• Ideal for a quick breakfast or light lunch\n' +
          '• Easy to customize with extra toppings like eggs or seeds\n' +
          '• Uses basic pantry and fridge ingredients',
        ingredients: [
          { productId: products[8]?._id || products[8], name: 'Bread', quantity: '2 slices' },
          { productId: products[9]?._id || products[9], name: 'Avocado', quantity: '1 medium' },
          { productId: products[3]?._id || products[3], name: 'Tomatoes', quantity: '1 medium, sliced' }
        ],
        instructions: [
          'Toast the bread slices until golden and crisp.',
          'Mash the avocado with a pinch of salt, pepper, and a squeeze of lemon.',
          'Spread the mashed avocado evenly over the toast.',
          'Top with tomato slices and any extra seasonings you like.',
          'Serve immediately for best texture.'
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
        description:
          '• Filling grain bowl built around protein-rich quinoa\n' +
          '• Packs in fresh greens and colorful vegetables\n' +
          '• Works warm or at room temperature\n' +
          '• Great option for meal prep lunches',
        ingredients: [
          { productId: products[10]?._id || products[10], name: 'Quinoa', quantity: '1 cup (uncooked)' },
          { productId: products[1]?._id || products[1], name: 'Spinach', quantity: '2 cups' },
          { productId: products[3]?._id || products[3], name: 'Tomatoes', quantity: '2 medium' }
        ],
        instructions: [
          'Rinse quinoa under cold water, then cook according to package instructions.',
          'While quinoa cooks, chop spinach and tomatoes.',
          'Fluff cooked quinoa with a fork and let it cool slightly.',
          'Combine quinoa, spinach, and tomatoes in a bowl.',
          'Add dressing or a simple olive oil and lemon mix, then serve.'
        ],
        dietaryTags: ['vegan', 'vegetarian', 'gluten-free'],
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
        prepTime: 15,
        cookTime: 20,
        servings: 3,
        rating: 4.6,
        reviewCount: 56
      },
      {
        name: 'Hearty Veggie Omelette',
        description:
          '• Protein-rich breakfast packed with fresh vegetables\n' +
          '• Simple one-pan recipe with minimal cleanup\n' +
          '• Customizable with any leftover veggies and cheese\n' +
          '• Keeps you full for a long morning',
        ingredients: [
          { productId: products[10]?._id || products[10], name: 'Eggs', quantity: '3 large' },
          { productId: products[1]?._id || products[1], name: 'Spinach', quantity: '1 cup, chopped' },
          { productId: products[3]?._id || products[3], name: 'Tomatoes', quantity: '1 medium, diced' }
        ],
        instructions: [
          'Crack eggs into a bowl, season with salt and pepper, and whisk well.',
          'Heat a non-stick pan with a little oil or butter.',
          'Add spinach and tomatoes and sauté for 1–2 minutes.',
          'Pour in the eggs and cook on low heat until set.',
          'Fold the omelette gently and serve warm.'
        ],
        dietaryTags: ['gluten-free', 'keto'],
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
        prepTime: 10,
        cookTime: 10,
        servings: 1,
        rating: 4.7,
        reviewCount: 61
      },
      {
        name: 'Overnight Berry Oats',
        description:
          '• No-cook breakfast you prepare the night before\n' +
          '• Soft, creamy oats with a berry topping\n' +
          '• Perfect grab-and-go option for busy mornings\n' +
          '• Easy to scale up for multiple servings',
        ingredients: [
          { productId: products[10]?._id || products[10], name: 'Oats / Grain Base', quantity: '1/2 cup' },
          { productId: products[2]?._id || products[2], name: 'Milk', quantity: '1/2 cup' },
          { productId: products[7]?._id || products[7], name: 'Berries', quantity: '1/2 cup' }
        ],
        instructions: [
          'Add oats to a jar or container.',
          'Pour in milk and stir to combine.',
          'Top with berries and a drizzle of honey if desired.',
          'Cover and refrigerate overnight.',
          'Stir and enjoy straight from the fridge in the morning.'
        ],
        dietaryTags: ['vegetarian'],
        image: 'https://images.unsplash.com/photo-1590080874087-51e37783714a?w=500',
        prepTime: 10,
        cookTime: 0,
        servings: 1,
        rating: 4.6,
        reviewCount: 48
      },
      {
        name: 'One-Pan Chicken & Veggies',
        description:
          '• Simple tray bake with chicken and mixed vegetables\n' +
          '• Minimal chopping and only one pan to wash\n' +
          '• Balanced dinner with protein and fiber\n' +
          '• Easy to double for meal prep',
        ingredients: [
          { productId: products[6]?._id || products[6], name: 'Chicken Breast', quantity: '2 pieces' },
          { productId: products[11]?._id || products[11], name: 'Broccoli', quantity: '2 cups, florets' },
          { productId: products[3]?._id || products[3], name: 'Tomatoes', quantity: '1–2 medium' }
        ],
        instructions: [
          'Preheat oven to 200°C (390°F).',
          'Place chicken, broccoli florets, and chopped tomatoes on a baking tray.',
          'Drizzle with olive oil and season well with salt, pepper, and herbs.',
          'Bake for 20–25 minutes, until chicken is cooked through.',
          'Serve straight from the tray while hot.'
        ],
        dietaryTags: ['gluten-free', 'keto', 'paleo'],
        image: 'https://images.unsplash.com/photo-1546069901-5ec6a79120b0?w=500',
        prepTime: 15,
        cookTime: 25,
        servings: 2,
        rating: 4.7,
        reviewCount: 73
      },
      {
        name: 'Simple Green Detox Smoothie',
        description:
          '• Light green smoothie that feels refreshing, not heavy\n' +
          '• Uses common greens and fruits, no exotic ingredients\n' +
          '• Great mid-morning or afternoon snack\n' +
          '• Can be adjusted by adding more fruit for sweetness',
        ingredients: [
          { productId: products[1]?._id || products[1], name: 'Spinach', quantity: '1 generous handful' },
          { productId: products[0]?._id || products[0], name: 'Bananas', quantity: '1 medium' },
          { productId: products[2]?._id || products[2], name: 'Milk / Liquid Base', quantity: '1 cup' }
        ],
        instructions: [
          'Add spinach, banana, and milk or water to a blender.',
          'Blend on high until the mixture is completely smooth.',
          'Taste and adjust sweetness if needed.',
          'Pour into a glass and serve chilled.',
          'Optional: add ice cubes and blend again for an extra cold drink.'
        ],
        dietaryTags: ['vegan', 'vegetarian', 'gluten-free'],
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
        prepTime: 8,
        cookTime: 0,
        servings: 1,
        rating: 4.4,
        reviewCount: 39
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
