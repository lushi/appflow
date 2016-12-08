const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const exphbs = require('express-handlebars');
const app = express();

/* form parser */
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/* express-handlebars */
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/* HACK: prefill the Db with some form data */
require('./db/formData.js');

require('./router')(app);

const listener = app.listen(3000, function() {
  console.log('Listening on ' + listener.address().port + '!');
})
