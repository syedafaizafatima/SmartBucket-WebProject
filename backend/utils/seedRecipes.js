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

    // Load all products (we'll reference them by name)
    const products = await Product.find();
    if (!products.length) {
      console.log('No products found. Please seed products first.');
      process.exit(1);
    }

    const findProductId = (name) => {
      const p = products.find((prod) => prod.name === name);
      if (!p) {
        console.warn(`⚠️ Product not found for recipe ingredient: "${name}"`);
        return null;
      }
      return p._id;
    };

    // Clear existing recipes
    await Recipe.deleteMany({});
    console.log('Cleared existing recipes');

    const sampleRecipes = [
      {
        name: 'Banana Berry Smoothie Bowl',
        description:
          '• Creamy fruit-based breakfast bowl\n' +
          '• Uses bananas, berries, and yogurt or milk\n' +
          '• High in fiber and natural sweetness\n' +
          '• Great for a quick, refreshing start to the day',
        ingredients: [
          { productId: findProductId('Organic Bananas'), name: 'Organic Bananas', quantity: '2 medium' },
          { productId: findProductId('Frozen Organic Berries Mix'), name: 'Frozen Organic Berries Mix', quantity: '1 cup' },
          { productId: findProductId('Organic Whole Milk'), name: 'Organic Whole Milk', quantity: '1/2 cup' },
          { productId: findProductId('Greek Yogurt - Plain'), name: 'Greek Yogurt - Plain', quantity: '1/2 cup' },
          { productId: findProductId('Granola Clusters - Honey & Almond'), name: 'Granola Clusters - Honey & Almond', quantity: '1/4 cup' }
        ],
        instructions: [
          'Add bananas, frozen berries, milk, and yogurt to a blender.',
          'Blend until thick and smooth, adjusting liquid to reach desired texture.',
          'Pour into a bowl and top with granola and a few fresh berries.',
          'Serve immediately while cold.'
        ],
        dietaryTags: ['vegetarian', 'gluten-free'],
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500',
        prepTime: 10,
        cookTime: 0,
        servings: 2,
        rating: 4.7,
        reviewCount: 58
      },
      {
        name: 'Avocado Toast with Eggs',
        description:
          '• Simple and filling breakfast or brunch\n' +
          '• Combines healthy fats, protein, and whole grains\n' +
          '• Customizable with toppings like tomatoes or greens\n' +
          '• Works well for meal-prepped mornings',
        ingredients: [
          { productId: findProductId('Whole Wheat Bread'), name: 'Whole Wheat Bread', quantity: '2 slices' },
          { productId: findProductId('Organic Avocados'), name: 'Organic Avocados', quantity: '1 medium' },
          { productId: findProductId('Cage-Free Eggs'), name: 'Cage-Free Eggs', quantity: '2 eggs' },
          { productId: findProductId('Cherry Tomatoes'), name: 'Cherry Tomatoes', quantity: '6–8 pieces' }
        ],
        instructions: [
          'Toast the whole wheat bread until golden.',
          'Mash avocado with salt, pepper, and a squeeze of lemon if available.',
          'Cook eggs to your preference (fried, poached, or scrambled).',
          'Spread avocado on toast, top with eggs and halved cherry tomatoes, then serve.'
        ],
        dietaryTags: ['vegetarian'],
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
        prepTime: 10,
        cookTime: 10,
        servings: 1,
        rating: 4.8,
        reviewCount: 72
      },
      {
        name: 'Quinoa Power Veggie Bowl',
        description:
          '• Balanced lunch or dinner bowl\n' +
          '• Combines quinoa, greens, and vegetables\n' +
          '• High in plant-based protein and fiber\n' +
          '• Easy to customize with your favorite toppings',
        ingredients: [
          { productId: findProductId('Organic Quinoa'), name: 'Organic Quinoa', quantity: '1 cup (uncooked)' },
          { productId: findProductId('Fresh Spinach'), name: 'Fresh Spinach', quantity: '2 cups' },
          { productId: findProductId('Organic Broccoli'), name: 'Organic Broccoli', quantity: '1 cup florets' },
          { productId: findProductId('Cherry Tomatoes'), name: 'Cherry Tomatoes', quantity: '1 cup' },
          { productId: findProductId('Canned Black Beans'), name: 'Canned Black Beans', quantity: '1/2 cup (rinsed)' }
        ],
        instructions: [
          'Cook quinoa according to package instructions and fluff with a fork.',
          'Lightly steam or sauté broccoli until tender-crisp.',
          'In a bowl, add a base of spinach, then top with quinoa, broccoli, black beans, and cherry tomatoes.',
          'Drizzle with your favorite dressing or a simple olive oil and lemon mix.'
        ],
        dietaryTags: ['vegan', 'vegetarian', 'gluten-free'],
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
        prepTime: 15,
        cookTime: 20,
        servings: 3,
        rating: 4.6,
        reviewCount: 64
      },
      {
        name: 'Chicken & Broccoli Brown Rice Stir-Fry',
        description:
          '• Quick one-pan dinner option\n' +
          '• Uses lean protein, whole grains, and vegetables\n' +
          '• Great for meal prep and leftovers\n' +
          '• Easy to flavor with your favorite stir-fry sauce',
        ingredients: [
          { productId: findProductId('Chicken Breast Fillets'), name: 'Chicken Breast Fillets', quantity: '2 medium fillets' },
          { productId: findProductId('Organic Broccoli'), name: 'Organic Broccoli', quantity: '2 cups florets' },
          { productId: findProductId('Brown Rice - Long Grain'), name: 'Brown Rice - Long Grain', quantity: '1 cup (uncooked)' },
          { productId: findProductId('Fresh Spinach'), name: 'Fresh Spinach', quantity: '1 cup' }
        ],
        instructions: [
          'Cook brown rice according to package instructions.',
          'Slice chicken into thin strips and season lightly with salt and pepper.',
          'In a hot pan, cook chicken until browned and fully cooked.',
          'Add broccoli and spinach, stir-fry with a splash of water or sauce until vegetables are tender.',
          'Serve stir-fry over warm brown rice.'
        ],
        dietaryTags: ['gluten-free'],
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500',
        prepTime: 15,
        cookTime: 20,
        servings: 3,
        rating: 4.7,
        reviewCount: 81
      },
      {
        name: 'Salmon with Roasted Veggies',
        description:
          '• Simple, oven-based dinner\n' +
          '• Pairs salmon with colorful roasted vegetables\n' +
          '• Rich in protein and healthy fats\n' +
          '• Minimal prep with big flavor',
        ingredients: [
          { productId: findProductId('Salmon Fillet'), name: 'Salmon Fillet', quantity: '2 fillets' },
          { productId: findProductId('Organic Broccoli'), name: 'Organic Broccoli', quantity: '1.5 cups florets' },
          { productId: findProductId('Baby Carrots'), name: 'Baby Carrots', quantity: '1 cup' },
          { productId: findProductId('Cherry Tomatoes'), name: 'Cherry Tomatoes', quantity: '1 cup' }
        ],
        instructions: [
          'Preheat oven to 200°C (400°F).',
          'Place salmon on a lined baking tray and season with salt, pepper, and a little oil or lemon.',
          'Add broccoli, baby carrots, and cherry tomatoes around the salmon and drizzle with oil.',
          'Roast for 15–20 minutes until salmon is cooked through and vegetables are tender.',
          'Serve hot straight from the tray.'
        ],
        dietaryTags: ['gluten-free', 'keto', 'paleo'],
        image: 'https://images.unsplash.com/photo-1615937691194-96f1628985f3?w=500',
        prepTime: 15,
        cookTime: 20,
        servings: 2,
        rating: 4.8,
        reviewCount: 93
      },
      {
        name: 'Peanut Butter Overnight Oats',
        description:
          '• Make-ahead breakfast that saves time\n' +
          '• Combines oats, milk, and peanut butter for lasting energy\n' +
          '• Easy to customize with fruit or seeds\n' +
          '• Perfect for busy weekday mornings',
        ingredients: [
          { productId: findProductId('Rolled Oats'), name: 'Rolled Oats', quantity: '1/2 cup' },
          { productId: findProductId('Organic Peanut Butter'), name: 'Organic Peanut Butter', quantity: '2 tbsp' },
          { productId: findProductId('Organic Whole Milk'), name: 'Organic Whole Milk', quantity: '1/2 cup' },
          { productId: findProductId('Organic Bananas'), name: 'Organic Bananas', quantity: '1 small (sliced)' },
          { productId: findProductId('Chia Seeds'), name: 'Chia Seeds', quantity: '1 tbsp' }
        ],
        instructions: [
          'In a jar or container, combine oats, milk, peanut butter, and chia seeds.',
          'Stir well until everything is evenly mixed.',
          'Top with sliced banana, cover, and refrigerate overnight.',
          'Enjoy cold the next morning, adding extra milk if needed.'
        ],
        dietaryTags: ['vegetarian'],
        image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500',
        prepTime: 10,
        cookTime: 0,
        servings: 1,
        rating: 4.6,
        reviewCount: 69
      },
      {
        name: 'Greek Yogurt Berry Parfait',
        description:
          '• Light dessert or snack with balanced macros\n' +
          '• Layers of yogurt, fruit, and crunchy toppings\n' +
          '• Easy to assemble in minutes\n' +
          '• Looks impressive in a glass or jar',
        ingredients: [
          { productId: findProductId('Greek Yogurt - Plain'), name: 'Greek Yogurt - Plain', quantity: '1 cup' },
          { productId: findProductId('Strawberries'), name: 'Strawberries', quantity: '1/2 cup (sliced)' },
          { productId: findProductId('Blueberries'), name: 'Blueberries', quantity: '1/2 cup' },
          { productId: findProductId('Granola Clusters - Honey & Almond'), name: 'Granola Clusters - Honey & Almond', quantity: '1/4 cup' }
        ],
        instructions: [
          'Add a layer of Greek yogurt to a glass or bowl.',
          'Top with a mix of sliced strawberries and blueberries.',
          'Sprinkle with granola for crunch.',
          'Repeat the layers if desired and serve immediately.'
        ],
        dietaryTags: ['vegetarian'],
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500',
        prepTime: 10,
        cookTime: 0,
        servings: 2,
        rating: 4.7,
        reviewCount: 88
      },
      {
        name: 'Simple Black Bean & Rice Bowl',
        description:
          '• Budget-friendly, filling meal\n' +
          '• Uses pantry staples like rice and beans\n' +
          '• Easy to batch-cook for multiple portions\n' +
          '• Can be topped with avocado, yogurt, or salsa',
        ingredients: [
          { productId: findProductId('Brown Rice - Long Grain'), name: 'Brown Rice - Long Grain', quantity: '1 cup (uncooked)' },
          { productId: findProductId('Canned Black Beans'), name: 'Canned Black Beans', quantity: '1 cup (rinsed)' },
          { productId: findProductId('Cherry Tomatoes'), name: 'Cherry Tomatoes', quantity: '1/2 cup (halved)' },
          { productId: findProductId('Fresh Spinach'), name: 'Fresh Spinach', quantity: '1 cup' },
          { productId: findProductId('Organic Avocados'), name: 'Organic Avocados', quantity: '1/2 medium (diced)' }
        ],
        instructions: [
          'Cook brown rice according to package instructions.',
          'Warm black beans in a small pot with a pinch of salt, pepper, and any spices you like.',
          'In a bowl, add rice as the base, then layer beans, spinach, cherry tomatoes, and diced avocado.',
          'Serve as is or with a squeeze of lime and a spoon of yogurt or salsa if available.'
        ],
        dietaryTags: ['vegan', 'vegetarian', 'gluten-free'],
        image: 'https://images.unsplash.com/photo-1604908176997-1251884b08a3?w=500',
        prepTime: 15,
        cookTime: 25,
        servings: 3,
        rating: 4.5,
        reviewCount: 61
      },
      {
        name: 'Veggie Hummus Snack Plate',
        description:
          '• Quick no-cook snack or light lunch\n' +
          '• Combines fresh vegetables, hummus, and crunchy extras\n' +
          '• Great for sharing or serving as an appetizer\n' +
          '• Easy way to increase daily veggie intake',
        ingredients: [
          { productId: findProductId('Hummus - Classic'), name: 'Hummus - Classic', quantity: '1/2 cup' },
          { productId: findProductId('Baby Carrots'), name: 'Baby Carrots', quantity: '1 cup' },
          { productId: findProductId('Cherry Tomatoes'), name: 'Cherry Tomatoes', quantity: '1 cup' },
          { productId: findProductId('Organic Almonds'), name: 'Organic Almonds', quantity: '1/4 cup' },
          { productId: findProductId('Kettle Cooked Potato Chips - Sea Salt'), name: 'Kettle Cooked Potato Chips - Sea Salt', quantity: '1 small handful' }
        ],
        instructions: [
          'Arrange hummus in a small bowl at the center of a plate or board.',
          'Place baby carrots, cherry tomatoes, almonds, and chips around the hummus.',
          'Serve immediately as a dip-style snack plate.',
          'Customize with extra vegetables or crackers if desired.'
        ],
        dietaryTags: ['vegetarian', 'gluten-free'],
        image: 'https://images.unsplash.com/photo-1615937669766-76c3c5c9e6c3?w=500',
        prepTime: 10,
        cookTime: 0,
        servings: 2,
        rating: 4.4,
        reviewCount: 52
      },
      {
        name: 'Margherita Pizza & Side Salad',
        description:
          '• Easy comfort meal using a frozen pizza base\n' +
          '• Paired with a fresh side salad for balance\n' +
          '• Great for lazy evenings with minimal cooking\n' +
          '• Can be shared or scaled for more people',
        ingredients: [
          { productId: findProductId('Frozen Margherita Pizza'), name: 'Frozen Margherita Pizza', quantity: '1 pizza' },
          { productId: findProductId('Fresh Spinach'), name: 'Fresh Spinach', quantity: '2 cups' },
          { productId: findProductId('Cherry Tomatoes'), name: 'Cherry Tomatoes', quantity: '1 cup' },
          { productId: findProductId('Cage-Free Eggs'), name: 'Cage-Free Eggs', quantity: '1 egg (optional, fried on top)' }
        ],
        instructions: [
          'Bake the frozen margherita pizza according to package instructions.',
          'While pizza bakes, mix spinach and halved cherry tomatoes in a bowl with simple dressing.',
          'Optionally, fry one egg and place it on top of the baked pizza for extra protein.',
          'Serve slices of pizza with a side of fresh salad.'
        ],
        dietaryTags: ['vegetarian'],
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500',
        prepTime: 10,
        cookTime: 15,
        servings: 2,
        rating: 4.3,
        reviewCount: 47
      },
      {
        name: 'Trail Mix Energy Bites (No Bake)',
        description:
          '• Sweet and nutty bite-sized snacks\n' +
          '• Uses pantry staples like oats, peanut butter, and trail mix\n' +
          '• No baking required, just mix and chill\n' +
          '• Ideal for pre-workout or afternoon energy boosts',
        ingredients: [
          { productId: findProductId('Rolled Oats'), name: 'Rolled Oats', quantity: '1 cup' },
          { productId: findProductId('Organic Peanut Butter'), name: 'Organic Peanut Butter', quantity: '1/2 cup' },
          { productId: findProductId('Trail Mix - Nuts & Dried Fruit'), name: 'Trail Mix - Nuts & Dried Fruit', quantity: '1/2 cup' },
          { productId: findProductId('Chia Seeds'), name: 'Chia Seeds', quantity: '2 tbsp' }
        ],
        instructions: [
          'In a mixing bowl, combine oats, peanut butter, trail mix, and chia seeds.',
          'Stir until the mixture is thick and sticky. Add a splash of water or honey if needed to bind.',
          'Roll into small bite-sized balls using your hands.',
          'Refrigerate for at least 30 minutes before serving for best texture.'
        ],
        dietaryTags: ['vegetarian'],
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500',
        prepTime: 20,
        cookTime: 0,
        servings: 4,
        rating: 4.6,
        reviewCount: 59
      }
    ];

    // Optional: sanity check for missing productIds
    sampleRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((ing) => {
        if (!ing.productId) {
          throw new Error(
            `Missing productId for ingredient "${ing.name}" in recipe "${recipe.name}". ` +
            `Make sure the product exists and the name matches exactly.`
          );
        }
      });
    });

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
