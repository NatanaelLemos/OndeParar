var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/:latlong', function(req, res, next) {
  console.log('Testing......', req.params.id);

  fs.readFile( __dirname + "/jsons/regioes/" + "regioes.json", 'utf8', function (err, data) {
    res.end( data );
  });

});

module.exports = router;
