// server/index.js
const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/saas_notes';
const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log('MongoDB connected');

    if (require.main === module) {
      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    }
  } catch (err) {
    console.error('Failed connecting to MongoDB', err);
    process.exit(1);
  }
}

start();

module.exports = app;
