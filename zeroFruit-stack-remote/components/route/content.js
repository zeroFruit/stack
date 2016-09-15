module.exports = function(connection) {
   var express    = require('express');
   var route      = express.Router();
   var path       = require('path');
   var fs         = require('fs');

   route.get(['/', '/:topic', '/:topic/:page'], function(req, res) {
      //var db_table   = 'topic_' + req.params.topic;
      var topic      = req.params.topic;
      var page       = parseInt(req.params.page);
      var table      = 'topic_' + topic;
      var response   = res;

      // there is no err handling when topic is null
      //


      if (page) {
         topicSelector(topic, table, page, response);
      }
      else {
         topicSelector(topic, table, 1, response);
      }
   });

   /*
   * topicSelector
   *
   * pagination, read file
   *
   */
   var topicSelector = function(topic, table, tmpPage, response) {
      /* implementing paging */
      var sql = 'SELECT COUNT(*) AS total FROM ' + table;
      var totalPage;             /* Result of COUNT query */
      var currentPage = tmpPage; /* Indicate current page */
      var pageArr = [];          /* Save pages which is indicated in pagination */

      connection.query(sql, function(err, rows, fields) {
         if (err) {
            console.log(err);
            response.status(500).send('Internal Server Error');
            response.end(" 'SELECT COUNT(*)' quering failed");
         }
         totalPage = parseInt(rows[0].total);

         /* Check Current Page */
         if (!currentPage) { /* Check that the page number is set*/
            currentPage = 1;
         }
         if (currentPage < 1) { /* If the page number is less than 1, make it 1 */
            currentPage = 1;
         }
         else if (currentPage > totalPage) { /* Check that the page is below the last page */
            currentPage = totalPage;
         }
         /* Listing the Pages */
         for (var p = 1; p <= totalPage; p++) {
            if (/*p === 1 || p === totalPage || */( (p <= (currentPage + 2))) && (p >= (currentPage - 2)) ) {
               pageArr.push(p);
            }
         }

         var sql = 'SELECT * FROM ' + table + ' LIMIT ' + (currentPage - 1) + ', 1';   /* quering content url, title */
         connection.query(sql, function(err, rows, fields) {
            if (err) {
               console.log(err);

               /*****************************************
               should do error handling alert and redirect

               * reference bookmark
               ******************************************/

               return response.render('nofile');
            }
            if (rows[0]) {  /* check whether there is content in db */
            var url = path.join(__dirname ,'/../',rows[0].url + '.html');  /* convert to absolute file path + name */
               fs.readFile(url, function (err, data) {
                  if (err) {
                     console.log(err);
                     return response.render('nofile');
                  }
                  var title   = rows[0].title;
                  var date    = rows[0].editDate;
                  var content = data;

                  /// show me data!
                  response.render('content',
                     {
                        pageArr: pageArr,
                        url: url,                  ///< file path
                        content: content,
                        topic: topic,              ///< category
                        currentPage: currentPage,
                        title: title,
                        date: date                 ///< edit date
                     });
               });
            }
            else {   /* If there is no content in db */
               response.render('nofile');
            }
         }); /* End of 'SELECT', 'LIMIT' query */
      }); /* End of 'COUNT(*)' query */
   }

   return route;
}
