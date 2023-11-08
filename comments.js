// Create web server

var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

/* GET comments listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET comment list. */
router.get('/list', function(req, res, next) {
  db.query('SELECT * FROM comments', function(err, rows) {
    res.json(rows);
  });
});

/* GET one comment. */
router.get('/get/:id', function(req, res, next) {
  db.query('SELECT * FROM comments WHERE id = ?', [req.params.id], function(err, rows) {
    res.json(rows);
  });
});

/* POST comment create. */
router.post('/create', urlencodedParser, function(req, res, next) {
  db.query('INSERT INTO comments (article_id, author, content) VALUES (?, ?, ?)', [req.body.article_id, req.body.author, req.body.content], function(err, rows) {
    res.json(rows);
  });
});

/* PUT comment update. */
router.put('/update/:id', jsonParser, function(req, res, next) {
  db.query('UPDATE comments SET article_id = ?, author = ?, content = ? WHERE id = ?', [req.body.article_id, req.body.author, req.body.content, req.params.id], function(err, rows) {
    res.json(rows);
  });
});

/* DELETE comment delete. */
router.delete('/delete/:id', function(req, res, next) {
  db.query('DELETE FROM comments WHERE id = ?', [req.params.id], function(err, rows) {
    res.json(rows);
  });
});

module.exports = router;