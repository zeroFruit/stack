module.exports = function(connection) {
   var express    = require('express');
   var route      = express.Router();
   var fs         = require('fs');

   route.get('/', function(req, res) {
      if (req.session.admin) {
         res.render('upload');
      }
      else {
         res.render('edit_auth');
      }
   });
   route.post('/', function(req, res) {

      if (req.body.title && req.body.content) {

         /* INSERT into DB, file data  */
         var fpath   = '../file-upload';  /* file storage dir */
         var fcg     = req.body.category; var table = 'topic_' + fcg;
         var title   = req.body.title;
         var content = req.body.content;
         var fname   = fpath + '/' + fcg + '-' + Date.now();
         var sql = 'INSERT INTO ' + table + ' (url, title) VALUES (?, ?)';


         console.log(fname);


         connection.query(sql, [fname, title], function(err, rows, fields) {
            if(err) {
               console.log(err);
               return res.status(500).send('Internal Server Error');
            }

            /* Write File */
            fs.writeFile(fname + '.html', content, function(err) {
               if (err) {
                  return res.status(500).send('Write file err');
               }
               // success message
               console.log('success write file!');
               res.send('successfully write!');
            });
         });
      }
   });

   return route;
}
