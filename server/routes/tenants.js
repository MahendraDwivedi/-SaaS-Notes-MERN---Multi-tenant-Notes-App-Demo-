const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { authMiddleware } = require('../middleware/auth');

// ✅ Upgrade tenant plan
router.post('/:slug/upgrade', authMiddleware, async (req, res) => {
  try {
    const slug = req.params.slug;

    if (req.user.tenant !== slug) {
      return res.status(403).json({ error: 'Can only upgrade your own tenant' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin role required' });
    }

    const tenant = await Tenant.findOne({ slug });
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    tenant.plan = 'pro';
    await tenant.save();

    res.json({ ok: true, plan: tenant.plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Invite new user into tenant
router.post('/:slug/invite', authMiddleware, async (req, res) => {
  try {
    const slug = req.params.slug;

    if (req.user.tenant !== slug) {
      return res.status(403).json({ error: 'Can only invite within your own tenant' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin role required' });
    }

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'email required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash('password', 8);
    const user = await User.create({
      email,
      passwordHash,
      role: 'member',
      tenant: slug
    });

    res.status(201).json({
      email: user.email,
      tenant: user.tenant,
      role: user.role
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Check tenant's subscription plan
router.get('/:slug/plan', authMiddleware, async (req, res) => {
  try {
    const slug = req.params.slug;

    // Optional: check tenant in token
    if (req.user.tenant !== slug) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const tenant = await Tenant.findOne({ slug });
    if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

    res.json({ plan: tenant.plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
