// Main apps integration test

const request = require('supertest');
const app = require('../../index');
const { aggregateCategories } = require('../../services/getCategories.service');
const { getPhrasesByCategory } = require('../../services/getPhrases.service');
const mockCategories = require('../__mocks__/mockCategories');
const formattedPhrases = require('../__mocks__/formattedPhrases');

// mock DB service
jest.mock('../../services/getCategories.service');
jest.mock('../../services/getPhrases.service');

describe('Integration tests - API endpoints', () => {

  describe('GET /api/get-categories', () => {
    it('should return 200 with categories', async () => {
      // mock DB response
      aggregateCategories.mockResolvedValue(mockCategories);

      const response = await request(app).get('/api/get-categories');

      // check response
      expect(response.body).toEqual({
        status: 200,
        message: 'ok',
        categories: mockCategories
      });
    });
  });

  describe('POST /api/get-phrases', () => {
    it('should return 200 with formatted phrases', async () => {
      // mock DB response
      getPhrasesByCategory.mockResolvedValue(require('../__mocks__/mockPhrases'));

      const response = await request(app)
        .post('/api/get-phrases')
        .send({ category: 'technical' });

      // check response
      expect(response.body).toEqual({
        status: 200,
        message: 'ok',
        phrases: formattedPhrases
      });
    });
  });
});
