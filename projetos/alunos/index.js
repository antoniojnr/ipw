var express = require('express');
var bp = require('body-parser');
var fs = require('fs'); // file system

var app = express();

const DB_PATH = 'alunos.db';

app.use(bp.json());

// Rotas
// Criar aluno
// POST /alunos
app.post('/alunos', function(req, res) {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFile(DB_PATH, '', function(err) { });
  }

  var mat = req.body.matricula,
      nom = req.body.nome,
      sob = req.body.sobrenome,
      tur = req.body.turma,
      med = req.body.media,
      cur = req.body.curso;
  var linha = `${mat} ${nom} ${sob} ${tur} ${med} ${cur}\n`;

  fs.appendFile(DB_PATH, linha, function(err) {
    if (err) {
      throw err;
    }

    res.send(req.body);
  });
});
// Recuperar aluno
// GET /alunos
app.get('/alunos', function(req, res) {
  fs.readFile(DB_PATH, function(err, buffer) {
    var registros = buffer.toString().split('\n');
    var result = [];

    for (var r of registros) {
      if (r !== '') {
        var aluno = r.split(' ');
        result.push({
          matricula: aluno[0],
          nome: aluno[1],
          sobrenome: aluno[2],
          curso: aluno[5],
          turma: aluno[3],
          media: aluno[4]
        });  
      }
    }

    res.json(result);
  })
});
// GET /alunos/:matricula
// Atualizar aluno
// PUT/PATCH /alunos
// Remover aluno
// DELETE /alunos/:matricula

app.listen(3000, function() {
  console.log('Executando na porta 3000');
})
