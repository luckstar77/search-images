const request = require('supertest');
const assert = require('power-assert');
const sinon = require('sinon');
const services = require('../../services');
const config = require('../../config');
const jwt = require('jsonwebtoken');

describe('should response result', async () => {
  before(async () => {
    await services.users.signup('test', 'test');
  });

  it('shoud response 200', async () => {
    const { status, body } = await request(app)
      .post('/login')
      .send({ username: 'test', password: 'test' });

    console.log(body);
    const { payload: user } = jwt.verify(body, config.SECRET_KEY);

    assert.equal(status, 200);
    assert.equal(user.username, 'test');
  });
});
