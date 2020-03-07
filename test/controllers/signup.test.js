const request = require('supertest');
const assert = require('power-assert');
const sinon = require('sinon');
const services = require('../../services');

describe('should response result', async () => {
  before(async () => {
    await services.users.deleteAll();
  });

  it('shoud response 200', async () => {
    const { status, body } = await request(app)
      .post('/signup')
      .send({ username: 'test', password: 'test' });

    console.log(body);
    assert.equal(status, 200);
  });
});
