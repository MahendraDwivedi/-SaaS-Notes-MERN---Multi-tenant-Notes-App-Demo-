// // server/app.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('express').json;
// const authRoutes = require('./routes/auth');
// const notesRoutes = require('./routes/notes');
// const tenantsRoutes = require('./routes/tenants');

// const app = express();

// app.use(cors());
// app.use(bodyParser());

// app.get('/api/health', (req, res) => {
//   res.json({ status: 'ok' });
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/notes', notesRoutes);
// app.use('/api/tenants', tenantsRoutes);

// // server/app.js
// app.get('/', (req, res) => {
//   res.send('<h1>Server is running ✅</h1><p>Welcome to the backend!</p>');
// });

// app.use('/api/*', (req, res) => {
//   res.status(404).json({ error: 'Not found' });
// });



// module.exports = app;


// server/app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const tenantsRoutes = require('./routes/tenants');

const app = express();

// ---------- CORS CONFIG ----------
const allowedOrigins = [
  'http://localhost:5173', // local frontend
  'https://saasnote-ruby.vercel.app' // deployed frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow mobile apps, curl
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Handle OPTIONS preflight for all routes
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true
}));

// ---------- MIDDLEWARE ----------
app.use(express.json());

// ---------- API ROUTES ----------
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/tenants', tenantsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ---------- ROOT ROUTE ----------
app.get('/', (req, res) => {
  res.send('<h1>Server is running ✅</h1><p>Welcome to the backend!</p>');
});

// ---------- CATCH-ALL 404 FOR API ----------
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
