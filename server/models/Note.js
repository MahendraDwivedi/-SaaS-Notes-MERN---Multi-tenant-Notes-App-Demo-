const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  tenant: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
module.exports = mongoose.model('Note', NoteSchema);
