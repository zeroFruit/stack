module.exports = function(passport) {
   var express    = require('express');
   var route      = express.Router();

   /* Router */
   // route.get('/edit', function(req, res) {
   //    if (!req.session.admin) {
   //       res.render('edit_auth');
   //    }
   // });

   // route.post('/edit', /* local strategy */
   //
   //    passport.authenticate(
   //       'local',
   //       {
   //         successRedirect: '/edit',
   //         failureRedirect: '/',
   //         failureFlash: false
   //       })
   // );

   return route;
}
