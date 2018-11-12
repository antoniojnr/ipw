var express = require('express');
var app = express();
var models = require('./models');
var http = require('http');
var bp = require('body-parser');
var User = models.User;
var axios = require('axios');
var request = axios.create({
  baseURL: 'https://backend-dot-webdev-ifpb.appspot.com'
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(req, res, next) {
  request.get('/users/me', {
    headers: {
      authorization: req.headers.authorization
    }
  }).then(function(resultado) {
    User
      .find({
        where: {
          email: resultado.data.username
        }
      })
      .then(function(user) {
        req.usuario = user;
        next();
      }).catch(function(error) {
        console.log(error);
        next();
      });
  }).catch(function(error) {
    console.log(error);
    next();
  });
});

app.use(express.static('./public'));
app.use('/scripts', express.static('./node_modules/angular'));
app.use('/scripts', express.static('./node_modules/angular-route'));
app.use('/scripts', express.static('./node_modules/bootstrap'));
app.use('/users', require('./routes/users'));
app.use('/images', require('./routes/images'));

var port = 8082;
app.set('port', port);

  /**
   * Cria o servidor HTTP
   */
var server = http.createServer(app);

models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port, function() {
    console.log('Express server listening on port ' + server.address().port);
  });
  server.on('error', onError);
  server.on('listening', onListening);
});

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
