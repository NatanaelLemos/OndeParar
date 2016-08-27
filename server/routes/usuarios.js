var express = require('express');
var router = express.Router();
var fs = require("fs");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ondeparar');

var Usuario = mongoose.model('Usuario', { login: String, senha: String, nome: String, email: String });

/* GET users listing. */
router.get('/', function(req, res, next) {

    Usuario.
    find({}, 'login senha nome email').
    limit(10).
    exec(function(err, usuarios) {
        if (err) {
            console.log(err);
        } else {
            res.send( usuarios );
        }
    });

});

router.get('/:id', function(req, res, next) {

    Usuario.findOne({ '_id': req.params.id }, 'login senha nome email', function (err, usuario) {
        if (err)
            console.log('Erro ao buscar usuario');
        else
            res.send(usuario);
    });

});

router.post('/', function(req, res) {


    console.log(req.body);
    var usuario = new Usuario(req.body);
    usuario.save(function (err) {
        console.log('Salvo!!!!!!!');

        if (err) {
            console.log(err);
        } else {
            fs.readFile( __dirname + "/jsons/" + "post_sucesso.json", req.body, function (err, data) {
                res.send( data );
            });
        }
    });

});

router.delete('/:id', function(req, res) {

    console.log('Creating', req.body);

    Usuario
        .find({"_id": req.params.id})
        .remove(function(err){
            if (err)
                console.log(err);
            else
                fs.readFile( __dirname + "/jsons/" + "delete_sucesso.json", req.body, function (err, data) {
                    res.send( data );
                });
            });

});

router.post('/login', function(req, res) {

    fs.readFile( __dirname + "/jsons/usuarios/login/" + "login_sucesso.json", req.body, function (err, data) {
        res.send( data );
    });

});

module.exports = router;
