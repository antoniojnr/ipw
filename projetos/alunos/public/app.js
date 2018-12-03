angular
  .module('alunos', [])
  .controller('MainCtrl', function($http) {

    var self = this;

    self.aluno = self.alunoEdit = {
      'matricula': '',
      'nome': '',
      'sobrenome': '',
      'turma': '',
      'media': '',
      'curso': ''
    }

    self.editar = function(aluno) {
      self.editando = true;

      aluno.matricula = parseInt(aluno.matricula);
      aluno.turma = parseInt(aluno.turma);
      aluno.media = parseInt(aluno.media);

      self.alunoEdit = Object.assign({}, aluno);
    }

    self.salvar = function() {
      $http
        .put('http://localhost:3000/alunos', self.alunoEdit)
        .then(function(result) {
          self.listar();
          self.editando = false;
        });
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
