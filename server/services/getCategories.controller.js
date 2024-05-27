const Phrase = require('../models/phrase.model');

// get categories from db
const aggregateCategories = () => {
  return Phrase.aggregate([
    { $unwind: '$categories' },
    { $group: { _id: '$categories', count: { $sum: 1 } } }
  ]);
};

module.exports = {
  aggregateCategories
};
