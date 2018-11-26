angular
  .module("images", [])
  .controller("MainCtrl", function($http) {
    var self = this;

    self.iniciar = function() {
      $http
        .get('profile.json')
        .then(function(result) {
          self.profile = result.data;
        });
    }

    self.iniciar();
  });
