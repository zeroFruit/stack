module.exports = function(app) {
   var express    = require('express');
   var router     = express.Router();
   var path       = require('path');
   var fs         = require('fs');
   var multer     = require('multer');

   var storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, '../etl-upload')
     },
     filename: function (req, file, cb) {
       cb(null, file.fieldname + '-' + Date.now())
     }
   })

   var upload = multer({ storage: storage })
   router.get('/', function(req, res, next) {

      res.render('etl_index');
   });

   router.post('/', function(req, res, next) {
      console.log(req.body);
      //res.send('success');
   });

   return router;
}
