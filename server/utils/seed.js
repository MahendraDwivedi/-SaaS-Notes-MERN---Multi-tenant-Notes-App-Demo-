require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Tenant = require('../models/Tenant');
const User = require('../models/User');
const Note = require('../models/Note');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/saas_notes';

async function seed() {
  await mongoose.connect(MONGODB_URI, {});
  console.log('Connected to MongoDB for seeding');

  await Tenant.deleteMany({});
  await User.deleteMany({});
  await Note.deleteMany({});

  const acme = await Tenant.create({ slug: 'acme', name: 'Acme Inc', plan: 'free' });
  const globex = await Tenant.create({ slug: 'globex', name: 'Globex Corp', plan: 'free' });

  const pwHash = await bcrypt.hash('password', 8);

  await User.create({ email: 'admin@acme.test', passwordHash: pwHash, role: 'admin', tenant: 'acme' });
  await User.create({ email: 'user@acme.test', passwordHash: pwHash, role: 'member', tenant: 'acme' });
  await User.create({ email: 'admin@globex.test', passwordHash: pwHash, role: 'admin', tenant: 'globex' });
  await User.create({ email: 'user@globex.test', passwordHash: pwHash, role: 'member', tenant: 'globex' });

  console.log('Seeded tenants and users');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
