var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

const ApplicationController = require('./controllers/Application.js');

module.exports = (app) => {
  app.get('/', ApplicationController.getHandler);
  app.post('/', upload.array(), ApplicationController.postHandler);
}
