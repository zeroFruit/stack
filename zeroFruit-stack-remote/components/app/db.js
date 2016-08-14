module.exports = function(Config) {
   /* mysql setting */
   var mysql      = require('mysql');
   var connection = mysql.createConnection({
     host     : Config.Host.dbConfig.host,
     user     : Config.Host.dbConfig.user,
     password : Config.Host.dbConfig.password,
     database : Config.Host.dbConfig.database
   });

   connection.connect();   /* db connection */

   return connection;
}
