import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './databse';
import authRoutes from './routes/auth';
import inventoryRoutes from './routes/inventory';
import caseRoutes from './routes/case';
import Skin from './models/Skin';
import Case from './models/Case';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/cases', caseRoutes);

// Database fixtures
const seedDatabase = async () => {
  try {
    // Check if data already exists
    const existingSkins = await Skin.count();
    const existingCases = await Case.count();

    if (existingSkins > 0 && existingCases > 0) {
      console.log('Database already seeded');
      return;
    }

    // Create skins
    const skins = await Skin.bulkCreate([
      // Common skins (lower value)
      { name: 'AK-47 | Redline', price: 15.50, image: 'ak47_redline.jpg' },
      { name: 'M4A4 | Asiimov', price: 45.20, image: 'm4a4_asiimov.jpg' },
      { name: 'AWP | Dragon Lore', price: 2500.00, image: 'awp_dragon_lore.jpg' },
      { name: 'Glock-18 | Water Elemental', price: 8.75, image: 'glock_water_elemental.jpg' },
      { name: 'USP-S | Kill Confirmed', price: 12.30, image: 'usp_kill_confirmed.jpg' },

      // Rare skins (higher value)
      { name: 'Karambit | Fade', price: 1200.00, image: 'karambit_fade.jpg' },
      { name: 'Butterfly Knife | Doppler', price: 800.50, image: 'butterfly_doppler.jpg' },
      { name: 'AK-47 | Fire Serpent', price: 350.75, image: 'ak47_fire_serpent.jpg' },
      { name: 'M4A1-S | Hot Rod', price: 85.25, image: 'm4a1s_hot_rod.jpg' },
      { name: 'Desert Eagle | Blaze', price: 95.00, image: 'deagle_blaze.jpg' },

      // Ultra rare skins
      { name: 'StatTrak™ AK-47 | Redline', price: 125.50, image: 'st_ak47_redline.jpg' },
      { name: 'Souvenir AWP | Dragon Lore', price: 15000.00, image: 'souvenir_awp_dragon_lore.jpg' },
      { name: 'Karambit | Crimson Web', price: 2800.00, image: 'karambit_crimson_web.jpg' },
      { name: 'StatTrak™ M4A4 | Howl', price: 4500.00, image: 'st_m4a4_howl.jpg' },
      { name: 'Bayonet | Ruby', price: 1850.00, image: 'bayonet_ruby.jpg' },
    ]);

    console.log(`Created ${skins.length} skins`);

    // Create cases with different skin pools
    const cases = await Case.bulkCreate([
      {
        name: 'Weapon Case',
        price: 2.50,
        skins: [1, 2, 4, 5, 9, 10] // Mix of common and uncommon skins
      },
      {
        name: 'Operation Breakout Case',
        price: 5.00,
        skins: [1, 2, 3, 8, 9, 11] // Better odds for rare items
      },
      {
        name: 'Chroma Case',
        price: 3.75,
        skins: [4, 5, 6, 7, 10, 15] // Knife and rare weapon skins
      },
      {
        name: 'Gamma Case',
        price: 4.25,
        skins: [2, 6, 7, 8, 11, 13] // High-tier skins with knives
      },
      {
        name: 'Prisma Case',
        price: 6.00,
        skins: [3, 6, 12, 13, 14, 15] // Premium case with ultra-rare items
      },
      {
        name: 'Dreams & Nightmares Case',
        price: 1.25,
        skins: [1, 4, 5, 9, 10] // Budget case with common skins
      }
    ]);

    console.log(`Created ${cases.length} cases`);
    console.log('Database seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

sequelize.sync().then(async () => {
  await seedDatabase();
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});