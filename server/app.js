// server/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('express').json;
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const tenantsRoutes = require('./routes/tenants');

const app = express();

app.use(cors());
app.use(bodyParser());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/tenants', tenantsRoutes);

app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
