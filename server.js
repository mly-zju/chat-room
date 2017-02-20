var koa = require('koa');
var parse = require('co-body');
var route = require('koa-route');
var views = require('co-views');
var webpack = require('webpack');
var webpackDev = require('koa-webpack-dev-middleware');
var webpackConf = require('./webpack.config.js');
var compiler = webpack(webpackConf);
var app = koa();

var render = views('./src', {ext: 'ejs'});

var server = require('http').Server(app.callback());
var io = require('socket.io')(server);

var cache = {
  nameList: [],
  msgList: []
};

io.on('connection', function(socket) {
  socket.on('new guest', function(data) {
    socket.nickname = data.nickname;
    io.emit('new guest', {list: cache.nameList});
  });
  socket.on('from client', function(data) {
    socket.broadcast.emit('from server', data);
    cache.msgList.push(data);
    if (cache.msgList.length >= 100) {
      cache.msgList.shift();
    }
  });
  socket.on('disconnect', function() {
    for (var i = 0; i < cache.nameList.length; i++) {
      if (cache.nameList[i] == socket.nickname) {
        cache.nameList.splice(i, 1);
        break;
      }
    }
    io.emit('new guest', {list: cache.nameList});
  });
});

app.use(webpackDev(compiler, {
  contentBase: webpackConf.output.path,
  publicPath: webpackConf.output.publicPath,
  hot: false
}));

app.use(route.get('/', function * () {
  this.body = yield render('index', {});
}));

app.use(route.get('/api/index', function * () {
  if (this.cookies.get('nickname') == undefined) {
    this.body = JSON.stringify({permit: false});
  } else {
    var nick = this.cookies.get('nickname');
    var flag = 1;
    for (var i = 0; i < cache.nameList.length; i++) {
      if (cache.nameList[i] == nick) {
        flag = 0;
        break;
      }
    }
    if (flag) {
      cache.nameList.push(nick);
      io.emit('new guest', {list: cache.nameList});
    }
    this.body = JSON.stringify({permit: true, nickname: nick});
  }
}));

app.use(route.post('/api/nickname', function * () {
  var body = yield parse(this, {});
  this.cookies.set('nickname', body);
  cache.nameList.push(body);
  this.body = '';
}));

app.use(route.post('/api/logout', function * () {
  var nick = this.cookies.get('nickname');
  this.cookies.set('nickname', undefined);
  for (var i = 0; i < cache.nameList.length; i++) {
    if (cache.nameList[i] == nick) {
      cache.nameList.splice(i, 1);
      break;
    }
  }
  io.emit('guest leave', {list: cache.nameList});
  this.body = '';
}));

server.listen(3000, function() {
  console.log('listening on 3000');
});

server.on('error', err => {
  console.log('error --> ', err.message);
  process.exit(1);
});
