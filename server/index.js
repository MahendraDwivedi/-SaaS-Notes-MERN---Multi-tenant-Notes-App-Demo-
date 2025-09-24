// // server/index.js
// const app = require('./app');
// const mongoose = require('mongoose');
// require('dotenv').config();


// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/saas_notes';
// const PORT = process.env.PORT || 4000;

// async function start() {
//   try {
//     await mongoose.connect(MONGODB_URI, {});
//     console.log('MongoDB connected');

//     if (require.main === module) {
//       app.listen(PORT, () => {
//         console.log(`Server listening on port ${PORT}`);
//       });
//     }
//   } catch (err) {
//     console.error('Failed connecting to MongoDB', err);
//     process.exit(1);
//   }
// }

// start();

// module.exports = app;

// api/index.js
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const app = require("../server/app");

let isConnected = false; // Track connection to avoid reconnecting every request

async function connectDB() {
  if (isConnected) return;
  const MONGODB_URI = process.env.MONGODB_URI;
  await mongoose.connect(MONGODB_URI, {});
  isConnected = true;
  console.log("MongoDB connected");
  if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

}

const handler = async (req, res) => {
  await connectDB();
  return serverless(app)(req, res);
};

module.exports = handler;
