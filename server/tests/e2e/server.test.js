const supertest = require('supertest');
const app = require('../../src/app');

const request = supertest(app);

describe('ohms server end-to-end tests', () => {
  it('GET /ohms/:id', async () => {
    expect.assertions(2);

    const response = await request.get('/ohms/0');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });

  it('POST /ohms/:id/next', async () => {
    expect.assertions(2);

    const response = await request.post('/ohms/0/next');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });
});
