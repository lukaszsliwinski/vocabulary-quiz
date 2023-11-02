const mongoose = require('mongoose');

const PhraseSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },

  pl: {
    type: String,
    required: true,
    unique: true,
  },

  en: {
    type: Array,
    required: true,
  },

  categories: {
    type: Array,
    required: true,
  }
});

module.exports = mongoose.model.Phrases || mongoose.model('Phrases', PhraseSchema);
