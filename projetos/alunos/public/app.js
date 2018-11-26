angular
  .module('alunos', [])
  .controller('MainCtrl', function($http) {

    var self = this;

    self.aluno = {
      'matricula': '',
      'nome': '',
      'sobrenome': '',
      'turma': '',
      'media': '',
      'curso': ''
    }

    self.cadastrar = function() {
      $http
        .post('http://localhost:3000/alunos', self.aluno)
        .then(function(result) {
          self.listar();
        });
    }

    self.listar = function() {
      $http
        .get('http://localhost:3000/alunos')
        .then(function(result) {
          self.alunos = result.data;
        });
    }

    this.listar();
  });
