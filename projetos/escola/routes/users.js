const express = require('express');
const app = express();
const models = require('../models/index');
const User = models.User;

/* Exercício:
   1. Padronizar as respostas de todas as requisições
   2. Criar a rota GET para um único usuário (exemplo: GET /users/fulano)
   3. Fazer uma rota de login (POST, corpo: { name, password })
   3.1. A rota de login retorna:
        { error: false, message: "Usuário conectado."} (se credenciais estiverem corretas)
        { error: true, message: "Nome de usuário ou senha incorretos."} (se credenciais estiverem erradas)
*/

// Remover usuário
app.delete('/users/:name', function(req, res) {
  User.destroy({
    where: {
      name: req.params.name
    }
  }).then(function(resultado) {
    res.json(resultado);
  })
});

// Atualizar usuário
app.put('/users', function(req, res) {
  User.update({
    password: req.body.password
  },
  { 
    where: {
      name: req.body.name
    }
  }).then(function(user) {
    res.json(user);
  });
});

// Criar novo usuário
app.post('/users', function(req, res) {
  User.create(req.body).then(function(user) {
    res.json({
      error: false,
      message: "O usuário foi criado." 
    });
  }).catch(function(error) {
    if (error.errors[0].validatorKey == 'not_unique') {
      res.json({
        error: true,
        // O caractere abaixo é acento grave, não aspa
        message: `O usuário ${error.errors[0].value} já existe.`
      });
    } else if (error.errors[0].validatorKey == 'is_null') {
      res.json({
        error: true,
        // O caractere abaixo é acento grave, não aspa
        message: `O atributo ${error.errors[0].path} não foi definido.`
      });
    } else {
      console.log(error);
      res.json({
        error: true,
        message: "Erro desconhecido."
      });
    }
  });
});

app.get('/users', function(req, res) {
  User.findAll({ attributes: ['id', 'name', 'password'] }).then(function(users) {
    res.json({
      error: false,
      result: users
    });
  });
});

module.exports = app;