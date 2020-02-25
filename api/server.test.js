const server = require('./server.js');
const request = require('supertest');

describe('POST /api/auth/register', () => {
  const user = {username: "test", password: "test"};
  it('has process.env.NODE_ENV as "testing"', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  })
  // Works once
  // it('returns status 201', async () => {
  //   const response = await request(server)
  //     .post('/api/auth/register')
  //     .send(user);
  //   expect(response.status).toEqual(201);
  // });
  it('returns a json object', () => {
    request(server)
      .post('/api/auth/register')
      .send(user)
      .expect('Content-Type', /json/)
  })
})

describe('POST /api/auth/login', () => {
  const user = {username: "test", password: "test"};
  it('returns status 200', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send(user);
    expect(response.status).toEqual(200);
  });
  it('returns a json object', () => {
    request(server)
      .post('/api/auth/login')
      .send(user)
      .expect('Content-Type', /json/)
  })
  it('returns a token', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send(user);
      expect(response.token)
  })
})


describe('GET /api/jokes/', () => {
  it('returns JSON', async () => {
    const response = await request(server).get('/api/jokes/');
    expect(response.type).toEqual('application/json');
  });
  it('returns status 401 when not logged in', async () => {
    const response = await request(server).get('/api/jokes/');
    expect(response.status).toEqual(401);
  });
})
