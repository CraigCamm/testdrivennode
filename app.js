
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var games = require('./routes/games');
var shots = require('./routes/shots');
var ships = require('./routes/ships');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/games', games.list);
app.post('/games', games.create);
app.put('/games/:id', games.update);
app.get('/games/:id', games.show);

app.post('/games/:id/shots', shots.create);

app.post('/games/:id/ships', ships.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
