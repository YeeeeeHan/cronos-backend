import request from 'supertest';
import { app } from '../index';

describe('GET /', () => {
  it('responds with "Welcome to Cronons Backend', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to Cronons Backend');
  });
});

// General tests
describe('General Tests', () => {
  it('should return 404 for invalid routes', async () => {
    const response = await request(app).get('/invalid-route');
    expect(response.status).toBe(404);
  });
});

// Balance endpoint
describe('GET /balance/:walletAddress', () => {
  it('responds with 400 if walletAddress is invalid', async () => {
    const response = await request(app).get('/balance/xxxxx');
    expect(response.status).toBe(400);
  });
});

// Token Balance endpoint
describe('GET /token-balance/:address/:tokenAddress', () => {
  it('responds with 400 if walletAddress is invalid', async () => {
    const response = await request(app).get('/token-balance/xxxxx/xxxxx');
    expect(response.status).toBe(400);
  });
});
