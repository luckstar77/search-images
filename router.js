let express = require('express');
let router = express.Router();
const controllers = require('./controllers');
const middlewares = require('./middlewares');

router.get(
  '/search',
  middlewares.validateLogin,
  middlewares.validateLogout,
  middlewares.validateQuery,
  controllers.search,
);
router.post(
  '/search',
  middlewares.validateLogin,
  middlewares.validateLogout,
  middlewares.validateBody,
  controllers.search,
);
router.post('/login', middlewares.validateUser, controllers.login);
router.get('/logout', middlewares.validateLogin, controllers.logout);
router.post('/signup', middlewares.validateUser, controllers.signup);

module.exports = router;
