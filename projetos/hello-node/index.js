var express = require('express');
var app = express();
var bp = require('body-parser');

app.use(bp.urlencoded({
  extended: true
}));

app.use(express.static('./public'));

app.post('/maiusculo', function(req, res) {
  res.send(req.body);
});

app.get('/calc/:op1/:op2/tipo/:oper', function(req, res) {
  var a = parseInt(req.params.op1);
  var b = parseInt(req.params.op2);

  if (req.params.oper == "soma") {
    res.send("Resultado: " + (a + b));
  } else if (req.params.oper == "sub") {
    res.send("Resultado: " + (a - b));
  } else if (req.params.oper == "mult") {
    res.send("Resultado: " + (a * b));
  } else {
    res.send("Resultado: " + (a / b));
  }

});

app.listen(3000, function() {
  console.log('executando...');
});
