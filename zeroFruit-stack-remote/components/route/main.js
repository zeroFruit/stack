module.exports = function() {
   var express    = require('express');
   var route      = express.Router();

   route.get('/', (req, res) => {
      res.render('index');
   });

   return route;
}
