import request from 'supertest';
import { UserExistsError } from '../errors/customErrors';
import { app } from '../index';

// Welcome endpoint
describe('GET /', () => {
  it('responds with "Welcome to Cronos Backend', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to Cronos Backend');
  });
});

// General tests
describe('General Tests', () => {
  it('should return 404 for invalid routes', async () => {
    const response = await request(app).get('/invalid-route');
    expect(response.status).toBe(404);
  });
});

// User register endpoints
describe('POST /users', () => {
  it('responds with 201 if user is registered successfully', async () => {
    const response = await request(app)
      .post('/users')
      .send({ username: 'username123', password: 'password123' });
    expect(response.status).toBe(201);
  });

  it('responds with 409 if username already exists', async () => {
    const response = await request(app)
      .post('/users')
      .send({ username: 'username123', password: 'password123' });
    expect(response.status).toBe(409);
    expect(response.body.errorName).toBe(new UserExistsError('-').name);
  });

  it('responds with 401 if username is missing from body', async () => {
    const response = await request(app)
      .post('/users')
      .send({ password: 'password' });
    expect(response.status).toBe(401);
    expect(response.body.errorName).toBe('AuthorizationError');
  });

  it('responds with 401 if password is missing from body', async () => {
    const response = await request(app)
      .post('/users')
      .send({ username: 'username' });
    expect(response.status).toBe(401);
    expect(response.body.errorName).toBe('AuthorizationError');
  });
});

// User login endpoints
describe('POST /users/login', () => {
  it('responds with 200 if user is authenticated successfully', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({ username: 'username123', password: 'password123' });
    expect(response.status).toBe(200);
  });

  it('responds with 401 if username is missing from body', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({ password: 'password' });
    expect(response.status).toBe(401);
    expect(response.body.errorName).toBe('AuthorizationError');
  });

  it('responds with 401 if password is missing from body', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({ username: 'username' });
    expect(response.status).toBe(401);
    expect(response.body.errorName).toBe('AuthorizationError');
  });

  it('responds with 401 if password is invalid', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({ username: 'username123', password: 'WRONG_PASSWORD' });
    expect(response.status).toBe(401);
    expect(response.body.errorName).toBe('AuthorizationError');
  });
});

// Balance endpoint
describe('GET /balance/:walletAddress', () => {
  it('responds with 401 if JWT is missing or invalid', async () => {
    // Missing JWT
    const response1 = await request(app).get(
      '/balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48'
    );
    expect(response1.status).toBe(401);

    // Invalid JWT
    const response2 = await request(app)
      .get('/balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48')
      .set('Authorization', 'Bearer INVALID_TOKEN');
    expect(response2.status).toBe(401);
  });

  it('responds with 200 if JWT token and wallet address is valid', async () => {
    // Login
    const loginResponse = await request(app)
      .post('/users/login')
      .send({ username: 'username123', password: 'password123' });
    expect(loginResponse.status).toBe(200);

    // Get balance
    const getBalResponse = await request(app)
      .get('/balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48')
      .set('Authorization', `Bearer ${loginResponse.body.token}`);
    expect(getBalResponse.status).toBe(200);
    expect(Number(getBalResponse.body.balance)).toBeGreaterThan(0);
  });

  it('responds with 204 if walletAddress is invalid', async () => {
    // Login
    const loginResponse = await request(app)
      .post('/users/login')
      .send({ username: 'username123', password: 'password123' });
    expect(loginResponse.status).toBe(200);

    // Get balance
    const getTokenResponse = await request(app)
      .get('/balance/0xINVALID')
      .set('Authorization', `Bearer ${loginResponse.body.token}`);
    expect(getTokenResponse.status).toBe(204);
  });
});

// Token Balance endpoint
describe('GET /token-balance/:address/:tokenAddress', () => {
  it('responds with 401 if JWT is missing or invalid', async () => {
    // Missing JWT
    const response1 = await request(app).get(
      '/token-balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48/0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23 '
    );
    expect(response1.status).toBe(401);

    // Invalid JWT
    const response2 = await request(app)
      .get('/balance/0x123')
      .set('Authorization', 'Bearer INVALID_TOKEN');
    expect(response2.status).toBe(401);
  });

  it('responds with 200 if JWT token and address is valid. Also responds with token balance', async () => {
    // Login
    const loginResponse = await request(app)
      .post('/users/login')
      .send({ username: 'username123', password: 'password123' });
    expect(loginResponse.status).toBe(200);

    // Get balance
    const getTokenBalResponse = await request(app)
      .get(
        '/token-balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48/0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23'
      )
      .set('Authorization', `Bearer ${loginResponse.body.token}`);
    expect(getTokenBalResponse.status).toBe(200);
    expect(Number(getTokenBalResponse.body.balance)).toBeGreaterThan(0);
  });

  it('responds with 204 if address is invalid', async () => {
    // Login
    const loginResponse = await request(app)
      .post('/users/login')
      .send({ username: 'username123', password: 'password123' });
    expect(loginResponse.status).toBe(200);

    // Get balance
    const getTokenResponse = await request(app)
      .get(
        '/token-balance/0xINVALID/0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23'
      )
      .set('Authorization', `Bearer ${loginResponse.body.token}`);
    expect(getTokenResponse.status).toBe(204);
  });

  it('responds with 204 if tokenAddress is invalid', async () => {
    // Login
    const loginResponse = await request(app)
      .post('/users/login')
      .send({ username: 'username123', password: 'password123' });
    expect(loginResponse.status).toBe(200);

    // Get balance
    const getTokenResponse = await request(app)
      .get(
        '/token-balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48/0xINVALID'
      )
      .set('Authorization', `Bearer ${loginResponse.body.token}`);
    expect(getTokenResponse.status).toBe(204);
  });
});
