var koa = require('koa');
var parse = require('co-body');
var route = require('koa-route');
var views = require('co-views');
var webpack = require('webpack');
var webpackDev = require('koa-webpack-dev-middleware');
var webpackConf = require('./webpack.config.js');
var compiler = webpack(webpackConf);
var serve = require('koa-static');
var app = new koa();

var render = views('./src', {
  ext: 'ejs'
});

var server = require('http').Server(app.callback());
var io = require('socket.io')(server);

var cache = {
  nameList: new Set([]),
  msgList: []
};

io.on('connection', function(socket) {
  socket.on('msg from client', function(data) {
    socket.broadcast.emit('msg from server', data);
    cache.msgList.push(data);
    if (cache.msgList.length >= 100) {
      cache.msgList.shift();
    }
  });
  socket.on('disconnect', function() {
    cache.nameList.delete(socket.nickname);
    io.emit('guest update',
      [...cache.nameList]
    );
  });
  socket.on('guest come', function(data) {
    cache.nameList.add(data);
    socket.nickname = data;
    io.emit('guest update',
      [...cache.nameList]
    );
  });
  socket.on('guest leave', function(data) {
    cache.nameList.delete(data);
    io.emit('guest update',
      [...cache.nameList]
    );
  });
});

// app.use(webpackDev(compiler, {
//   contentBase: webpackConf.output.path,
//   publicPath: webpackConf.output.publicPath,
//   hot: false
// }));

app.use(serve('./dist'));

app.use(route.get('/', function*() {
  this.body = yield render('index', {});
}));

app.use(route.get('/api/auth', function*() {
  if (this.cookies.get('nickname') == undefined) {
    this.body = JSON.stringify({
      permit: false
    });
  } else {
    var nick = this.cookies.get('nickname');
    this.body = JSON.stringify({
      permit: true,
      nickname: nick
    });
  }
}));

app.use(route.post('/api/nickname', function*() {
  var body = yield parse(this, {});
  if (!cache.nameList.has(body)) {
    this.cookies.set('nickname', body);
    this.body = JSON.stringify({
      legal: true
    });
  } else {
    this.body = JSON.stringify({
      legal: false
    });
  }
}));

app.use(route.post('/api/logout', function*() {
  var nick = this.cookies.get('nickname');
  this.cookies.set('nickname', undefined);
  this.body = '';
}));

server.listen(process.env.PORT || 5000, function() {
  console.log('listening');
});

server.on('error', err => {
  console.log('error --> ', err.message);
  process.exit(1);
});
