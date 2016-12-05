const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
require('./router')(app);

// app.set('views', path.join(__dirname, 'views'));

/* express-handlebars */
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const listener = app.listen(3000, function() {
  console.log('Listening on ' + listener.address().port + '!');
})
