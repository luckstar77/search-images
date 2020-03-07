global.app = require('../index.js');
const services = require('../services');

before(async () => {
  await services.users.deleteAll();
  await services.token.deleteAll();
});
