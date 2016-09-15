var Config     = require('./config/config');
var connection = require('./app/db')(Config);
var app        = require('./app/express')(Config);
var passport   = require('./app/passport')(app, connection);


var r_content   = require('./route/content')(connection);
var r_auth      = require('./route/auth')(passport);
var r_edit      = require('./route/edit')(connection);
var r_index     = require('./route/main')();
var r_etl       = require('./route/etl')(app);

app.use('/content', r_content);
app.use('/auth', r_auth);
app.use('/edit', r_edit);
app.use('/', r_index);
app.use('/etl', r_etl);

app.listen(3000, () => {
   console.log("Connected to 3000 port!");
});
