module.exports = function(Config) {
   var express    = require('express');
   var multer     = require('multer');
   var bodyParser = require('body-parser');
   var path       = require('path');

   var session    = require('express-session');
   var MySQLStore = require('express-mysql-session')(session);

   var app        = express();

   /* jade setting */
   app.set('views', '../views');
   app.set('view engine', 'jade');
   /* body-parser */
   app.use(bodyParser.urlencoded({ extended: false }));
   /* express-session, express-mysql-session */
   var options = {
       host: Config.Session.dbConfig.host,
       port: Config.Session.dbConfig.port,
       user: Config.Session.dbConfig.user,
       password: Config.Session.dbConfig.password,
       database: Config.Session.dbConfig.database
   };
   var sessionStore = new MySQLStore(options);

   app.use(session({
       secret: Config.Session.env.secret,
       store: sessionStore,
       resave: true,
       saveUninitialized: true
   }));
   /* file storage setting */
   var storage    = multer.diskStorage({
      destination: function (req, file, cb) {
       cb(null, '../file-upload');
     },
     filename: function (req, file, cb) {
       cb(null, file.fieldname + '-' + Date.now())
     }
   });
   var upload = multer({ storage: storage }).single('userFile');

   /* path */
   app.use("/html",            express.static(path.join(__dirname, '/../../views')));
   app.use("/css",             express.static(path.join(__dirname, '/../../css')));
   app.use("/bootstrap",       express.static(path.join(__dirname, '/../bootstrap')));
   app.use("/js",              express.static(path.join(__dirname, '/../../js')));
   app.use("/content",         express.static(path.join(__dirname, '/../../zf_content')));

   return app;
}
