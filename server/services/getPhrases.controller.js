const Phrase = require('../models/phrase.model');

// get phrases from db by category
const getPhrasesByCategory = (category) => {
  return Phrase.aggregate([{ $match: { categories: category } }, { $sample: { size: 10 } }]);
};

const formatResult = (result) => {
  let data = [];

  result.forEach((phrase, i) => {
    data.push({
      id: i + 1,
      pl: phrase.pl,
      en: phrase.en,
      categories: phrase.categories
    });
  });

  return data;
};

module.exports = {
  getPhrasesByCategory,
  formatResult
};
