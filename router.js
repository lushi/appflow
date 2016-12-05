const ApplicationController = require('./controllers/Application.js');

module.exports = (app) => {
  /* routes */
  app.get('/', (ApplicationController.Index));
}
