var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('Testing......');

  fs.readFile( __dirname + "/jsons/enderecos/" + "enderecos.json", 'utf8', function (err, data) {
    res.end( data );
  });

});

router.get('/:latlong', function(req, res, next) {
  console.log('Testing......', req.params.latlong);

  fs.readFile( __dirname + "/jsons/enderecos/" + "endereco.json", 'utf8', function (err, data) {
    res.end( data );
  });

});

router.post('/', function(req, res) {

    fs.readFile( __dirname + "/jsons/" + "post_sucesso.json", req.body, function (err, data) {
        res.send( data );
    });

});

router.delete('/', function(req, res) {

    console.log('Creating', req.body);

    fs.readFile( __dirname + "/jsons/" + "delete_sucesso.json", req.body, function (err, data) {
        res.send( data );
    });

});


/* VAGAS */
router.get('/:latlong/vagas', function(req, res, next) {
    console.log('Testing......', req.params.latlong);

    fs.readFile( __dirname + "/jsons/enderecos/vagas/" + "vagas.json", 'utf8', function (err, data) {
        res.end( data );
    });

});

router.get('/:latlong/vagas/:id', function(req, res, next) {
    console.log('Testing......', req.params.latlong);
    console.log('Testing......', req.params.id);

    fs.readFile( __dirname + "/jsons/enderecos/vagas/" + "vaga.json", 'utf8', function (err, data) {
        res.end( data );
    });

});

router.delete('/:latlong/vagas/:id', function(req, res, next) {
    console.log('Testing......', req.params.latlong);
    console.log('Testing......', req.params.id);

    fs.readFile( __dirname + "/jsons/" + "delete_sucesso.json", 'utf8', function (err, data) {
        res.end( data );
    });

});

router.post('/:latlong/vagas/', function(req, res, next) {
    console.log('Testing......', req.params.latlong);

    fs.readFile( __dirname + "/jsons/" + "post_sucesso.json", 'utf8', function (err, data) {
        res.end( data );
    });

});



module.exports = router;
