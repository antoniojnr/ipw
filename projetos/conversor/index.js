var express = require('express');
var app = express();
var bp = require('body-parser');

app.use(bp.urlencoded({
  extended: true
}));

app.use(express.static('./public'));

app.post('/converter', function(req, res) {
  var val = parseInt(req.body.val);
  var resultado = val;
  var und;
  var or = req.body.or;
  var de = req.body.de;

  if (or === 'c') {
    if (de === 'f') {
      resultado = 1.8 * val + 32;
      und = ' °F';
    } else if (de === 'k') {
      resultado = val + 273.15;
      und = ' K';
    } else {
      und = ' °C';
    }

    res.send('Resultado: ' + resultado + und);
  } else if (or === 'f') {
    if (de === 'c') {
      var c = (val - 32) / 1.8;
      res.send('Resultado: ' + c + ' °C');
    } else if (de === 'k') {
      var k = (val - 523.67) / 1.8;
      res.send('Resultado: ' + k + ' K');
    } else {
      res.send('Resultado: ' + val + ' °F')
    }
  } else if (or === 'k') {
    if (de === 'c') {
      var c = val - 273.15;
      res.send('Resultado: ' + c + ' °C');
    } else if (de === 'f') {
      var f = 1.8 * (val - 273.15) + 32;
      res.send('Resultado: ' + k + ' °F');
    } else {
      res.send('Resultado: ' + val + ' K')
    }
  }
});

app.listen(3000, function() {
  console.log('executando...');
});
