angular
  .module('imageapp')
  .controller('LoginCtrl', function($http) {

    var self = this;

    this.login = function() {
      login(function(resultado) {
        localStorage['token'] = resultado.token;

        self.myLogin(resultado.token);
      });
    }

    this.myLogin = function(token) {
      $http
        .post('http://localhost:8082/users/login', { token })
        .then(function(res) {
          self.perfil = res.data;
        });
    }

    if (localStorage['token']) {
      self.myLogin(localStorage['token']);
    }
  });
