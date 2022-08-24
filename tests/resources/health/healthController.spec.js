import request from 'supertest';
import app from '../../../src/app.js';
// const request = require('supertest');

jest.mock('../../../src/utils/logger');

describe('Health Controller', () => {
  describe('Healthy', () => {
    test('Given a healthy service when I get the health status then it should return 200 ok', async () => {
      const response = await request(app).get('/');
      expect(response.text).toEqual('Healthy');
      expect(response.statusCode).toBe(200);
    });
  });
});
