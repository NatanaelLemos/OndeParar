var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('Testing......');

  fs.readFile( __dirname + "/jsons/usuarios/" + "usuarios.json", 'utf8', function (err, data) {
    res.end( data );
  });

});

router.get('/:id', function(req, res, next) {
  console.log('Testing......', req.params.id);

  fs.readFile( __dirname + "/jsons/usuarios/" + "usuario.json", 'utf8', function (err, data) {
    res.end( data );
  });

});

router.post('/', function(req, res) {

    fs.readFile( __dirname + "/jsons/" + "post_sucesso.json", req.body, function (err, data) {
        res.send( data );
    });

});

router.delete('/:id', function(req, res) {

    console.log('Creating', req.body);

    fs.readFile( __dirname + "/jsons/" + "delete_sucesso.json", req.body, function (err, data) {
        res.send( data );
    });

});

router.post('/login', function(req, res) {

    fs.readFile( __dirname + "/jsons/usuarios/login/" + "login_sucesso.json", req.body, function (err, data) {
        res.send( data );
    });

});

module.exports = router;
