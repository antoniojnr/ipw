angular
  .module('imageapp')
  .controller('LoginCtrl', function($http) {
    this.login = function() {
      login(function(resultado) {
        $http
          .post('http://localhost:8082/users/login', resultado);
      });
    }
  });
