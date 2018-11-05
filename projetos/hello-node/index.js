var express = require('express');
var app = express();
var bp = require('body-parser');

app.use(bp.urlencoded({
  extended: true
}));

app.use(express.static('./public'));

app.post('/maiusculo', function(req, res) {
  res.send(req.query);
});

// fahrenheit

app.post('/calc', function(req, res) {
  var a = parseInt(req.body.op1);
  var b = parseInt(req.body.op2);

  console.log(req.body);

  if (req.body.oper == "soma") {
    res.send("Resultado: " + (a + b));
  } else if (req.body.oper == "sub") {
    res.send("Resultado: " + (a - b));
  } else if (req.body.oper == "mult") {
    res.send("Resultado: " + (a * b));
  } else {
    res.send("Resultado: " + (a / b));
  }

});

app.listen(3000, function() {
  console.log('executando...');
});
