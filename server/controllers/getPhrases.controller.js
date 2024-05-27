const { getPhrasesByCategory, formatResult } = require('../services/getPhrases.controller');

// get phrases
const getPhrases = (request, response) => {
  getPhrasesByCategory(request.body.category)
    .then((result) => {
      let data = [];

      result.forEach((phrase, i) => {
        data.push({
          id: i + 1,
          pl: phrase.pl,
          en: phrase.en,
          categories: phrase.categories
        });
      });

      response.status(200).json({
        status: 200,
        message: 'ok',
        phrases: data
      });
    })
    .catch(() => {
      response.status(500).json({
        status: 500,
        message: 'Error, please try again later.',
        phrases: []
      });
    });
};

module.exports = getPhrases;
