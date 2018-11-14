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
    var linhas = buffer.toString().split('\n');
    var result = [];

    for (var linha of linhas) {
      if (linha !== '') {
        var aluno = linha.split(' ');

        result.push({
          matricula: aluno[0],
          nome: aluno[1],
          sobrenome: aluno[2],
          turma: aluno[3],
          media: aluno[4],
          curso: aluno[5]
        });
      }
    }

    res.json(result);
  });
});

// GET /alunos/:matricula
app.get('/alunos/:matricula', function(req, res) {
  var mat = req.params.matricula;
  fs.readFile(DB_PATH, function(err, buffer) {
    var registros = buffer.toString().split('\n');

    for (var r of registros) {
      if (r !== '') {
        var aluno = r.split(' ');
        console.log(aluno);
        if (mat === aluno[0]) {
          res.json({
            matricula: aluno[0],
            nome: aluno[1],
            sobrenome: aluno[2],
            curso: aluno[5],
            turma: aluno[3],
            media: aluno[4]
          });
          return;
        }
      }
    }

    res.json({});
  })
});

// Remover aluno
// DELETE /alunos/:matricula
app.delete('/alunos/:matricula', function(req, res) {
  var mat = req.params.matricula;
  fs.readFile(DB_PATH, function(err, buffer) {
    var registros = buffer.toString().split('\n');
    var novoCont = "";

    for (var r of registros) {
      if (r !== '') {
        console.log(novoCont);
        console.log('');
        var aluno = r.split(' ');
        if (mat !== aluno[0]) {
          novoCont = novoCont + r + '\n';
        }
      }
    }

    fs.writeFile(DB_PATH, novoCont, function(err) { });

    res.json(200);
  })
});

// Atualizar aluno
// PUT /alunos

// Busca avançada (nome/serie/curso)
// GET /alunos?campo=curso&valor=Informática
app.listen(3000, function() {
  console.log('Executando na porta 3000');
})
