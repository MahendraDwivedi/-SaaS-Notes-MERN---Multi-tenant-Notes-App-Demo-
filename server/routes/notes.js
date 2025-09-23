const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const Tenant = require('../models/Tenant');
const { authMiddleware } = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', async (req, res) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const tenantSlug = req.user.tenant;
  const tenant = await Tenant.findOne({ slug: tenantSlug });
  if (!tenant) return res.status(400).json({ error: 'tenant not found' });
  if (tenant.plan === 'free') {
    const count = await Note.countDocuments({ tenant: tenantSlug });
    if (count >= 3) return res.status(403).json({ error: 'Note limit reached for Free plan. Upgrade to Pro.' });
  }
  const note = await Note.create({ title, content, tenant: tenantSlug, createdBy: req.user.id });
  res.status(201).json(note);
});

router.get('/', async (req, res) => {
  const tenantSlug = req.user.tenant;
  const notes = await Note.find({ tenant: tenantSlug }).sort({ createdAt: -1 });
  res.json(notes);
});

router.get('/:id', async (req, res) => {
  const tenantSlug = req.user.tenant;
  const note = await Note.findOne({ _id: req.params.id, tenant: tenantSlug });
  if (!note) return res.status(404).json({ error: 'Not found' });
  res.json(note);
});

router.put('/:id', async (req, res) => {
  const tenantSlug = req.user.tenant;
  const { title, content } = req.body;
  const note = await Note.findOne({ _id: req.params.id, tenant: tenantSlug });
  if (!note) return res.status(404).json({ error: 'Not found' });
  if (typeof title !== 'undefined') note.title = title;
  if (typeof content !== 'undefined') note.content = content;
  await note.save();
  res.json(note);
});

router.delete('/:id', async (req, res) => {
  const tenantSlug = req.user.tenant;
  const note = await Note.findOneAndDelete({ _id: req.params.id, tenant: tenantSlug });
  if (!note) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

module.exports = router;
