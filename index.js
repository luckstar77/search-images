const express = require('express');
require('express-async-errors');
const router = require('./router');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const mongo = require('./mongoose');
const config = require('./config');

app.use(cookieParser());
app.use(
  bodyParser.json({
    type: '*/*',
  }),
);

app.get('/health', function(req, res) {
  res.send('OK');
});

app.use('/', router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).send(err.message);
});

process.on('unhandledRejection', function(err) {
  console.error(err);
});

(async () => {
  const server = app.listen(config.PORT);
})();

module.exports = app;
