angular
  .module("images", [])
  .controller("MainCtrl", function($http) {
    var self = this;

    self.editando = false;
    self.valor = "";

    self.iniciar = function() {
      $http
        .get('profile.json')
        .then(function(result) {
          self.profile = result.data;
        });
    }

    self.like = function(img) {
      var indice = img.likes.indexOf(self.profile.email);

      if (indice >= 0) {
        img.likes.splice(indice, 1);
      } else {
        img.likes.push(self.profile.email);
      }
    }

    self.getLikes = function(img) {
      var indice = img.likes.indexOf(self.profile.email);

      if (indice > 0) {
        var nome = img.likes[0];
        img.likes[0] = img.likes[indice];
        img.likes[indice] = nome;
      }

      var first = (img.likes[0] === self.profile.email) ? "Você" : img.likes[0];

      if (img.likes.length == 0) {
        return "";
      } else if (img.likes.length == 1) {
        return first + " curtiu"
      } else if (img.likes.length == 2) {
        return first + " e mais 1 pessoa curtiu";
      } else if (img.likes.length > 2) {
        return first + " e mais " + (img.likes.length - 1) + " pessoas curtiram";
      }
    }

    self.editar = function(img) {
      self.editando = !self.editando;

      if (self.editando) {
        self.valor = img.tags.join(", ");
      } else {
        img.tags = self.valor.split(", ");
      }
    }

    self.iniciar();
  });
