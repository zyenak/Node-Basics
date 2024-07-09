const bodyParser = require('./body-parser');
const requestLogger = require('./request-logger');
const authMiddleware = require('./auth-middleware');

module.exports = {
  bodyParser,
  requestLogger,
  authMiddleware,
};
