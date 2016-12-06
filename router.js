const ApplicationController = require('./controllers/Application.js');

module.exports = (app) => {
  app.get('/', ApplicationController.getHandler);
}
