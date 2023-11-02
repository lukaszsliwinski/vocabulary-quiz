const Phrase = require('../models/phrase.model')

const getPhrases = (request, response) => {
  Phrase
    .aggregate([
      {$match: { categories: request.body.category }},
      {$sample: { size: 10 }}
    ])
    .then((result) => {
      let data = [];

      result.forEach((phrase, i) => {
        data.push({
          id: i+1,
          pl: phrase.pl,
          en: phrase.en,
          categories: phrase.categories
        })
      })

      console.log(data);

      response.status(200).json({
        status: 200,
        message: 'ok',
        phrases: data
      })
    })
    .catch((error) => {
      console.log(error);

      // sprawdzić kod błędu - poniżej tymczasowo!!!
      response.status(404).json({
        status: 404,
        message: 'error',
        phrases: []
    });
  });
}

module.exports = getPhrases;
