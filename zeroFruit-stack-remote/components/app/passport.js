module.exports = function(app, connection) {
   /* passport */
   var passport         = require('passport');
   var LocalStrategy    = require('passport-local').Strategy;
   app.use(passport.initialize());
   app.use(passport.session());

   /* for authenticate */
   var bkfd2Password = require("pbkdf2-password");
   var hasher = bkfd2Password();

   /* passport-session */
   passport.serializeUser(function(user, done) {
     done(null, user.authId);
   });
   passport.deserializeUser(function(id, done) {
      var sql = 'SELECT * FROM Users WHERE authId=?';
      connection.query(sql, [id], function(err, results) {
         if (err) {
            console.log(err);
            done('There is no user.');
            // more detail error-handler is need
         }
         else {
            done(null, results[0]);
         }
      });
   });

   /* Local Strategy */
   passport.use(new LocalStrategy(
      function(username, password, done) {
         var uname = username;
         var pwd   = password;
         var sql   = 'SELECT * FROM Users WHERE authId=?';
         connection.query(sql, ['local:'+uname], function(err, results) {
            if (err) {
               return done('There is no user');
               // more detail error-handler is need
            }
            var user = results[0];
            var config = {
               password: pwd,
               salt: user.salt
            }
            return hasher(config, function(err, pass, salt, hash) {
               if(hash === user.password) {
                  return done(null, user);
               }
               else {
                  return done(null, false);
                  // SHOULD FIX to send falure flash
               }
            });
         })
      })
   );

   return passport;
}
