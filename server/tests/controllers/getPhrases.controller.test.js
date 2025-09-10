// Get phrases controller unit test

const getPhrases = require('../../controllers/getPhrases.controller');
const { getPhrasesByCategory } = require('../../services/getPhrases.service');
const mockPhrases = require('../__mocks__/mockPhrases');
const formattedPhrases = require('../__mocks__/formattedPhrases');

jest.mock('../../services/getPhrases.service');

describe('getPhrases.controller', () => {
  it('should return 200 with phrases', async () => {
    // mock service to return fake phrases
    getPhrasesByCategory.mockResolvedValue(mockPhrases);

    const request = { body: { category: 'technical' } };
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // call controller
    await getPhrases(request, response);

    // check response
    expect(response.json).toHaveBeenCalledWith({
      status: 200,
      message: 'ok',
      phrases: formattedPhrases
    });
  });
});
