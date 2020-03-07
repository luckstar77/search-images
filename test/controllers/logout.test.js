const request = require('supertest');
const assert = require('power-assert');
const sinon = require('sinon');
const services = require('../../services');
const config = require('../../config');
const jwt = require('jsonwebtoken');

describe('should response result', async () => {
  let token;

  before(async () => {
    await services.users.deleteAll();
    const result = await services.users.signup('test', 'test');
    const payload = {
      _id: result._id,
      username: result.username,
    };

    token = jwt.sign(
      { payload, exp: Math.floor(Date.now() / 1000) + 60 * 15 },
      config.SECRET_KEY,
    );
  });

  it('shoud response 200', async () => {
    const { status, body } = await request(app)
      .get('/logout')
      .set('authorization', token);

    console.log(body);
    assert.equal(status, 200);
    assert.equal(await services.token.isExist(token), true);
  });
});
