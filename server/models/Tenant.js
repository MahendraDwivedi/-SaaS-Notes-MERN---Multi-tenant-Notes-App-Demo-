const mongoose = require('mongoose');
const TenantSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String },
  plan: { type: String, enum: ['free','pro'], default: 'free' }
});
module.exports = mongoose.model('Tenant', TenantSchema);
