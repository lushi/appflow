const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const app = express();
require('./router')(app);

app.set('views', path.join(__dirname, 'view'));

/* express-handlebars */
const hbs = handlebars.create({
  defaultLayour: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const listener = app.listen(3000, function() {
  console.log('Listening on ' + listener.address().port + '!');
})
