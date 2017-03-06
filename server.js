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
  nameList: {},
  nameListActive: new Set([]),
  msgList: []
};

var sessionFresh = setInterval(function() {
  for (var key in cache.nameList) {
    cache.nameList[key] -= 10000;
    if (cache.nameList[key] <= 0) {
      delete cache.nameList[key];
    }
  }
}, 10000);

io.on('connection', function(socket) {
  socket.on('msg from client', function(data) {
    if (!cache.nameListActive.has(data.nickName)) {
      socket.emit('self logout');
    } else {
      socket.broadcast.emit('msg from server', data);
      cache.msgList.push(data);
      if (cache.msgList.length >= 100) {
        cache.msgList.shift();
      }
    }
  });
  socket.on('disconnect', function() {
    cache.nameListActive.delete(socket.nickname);
    io.emit('guest update',
      [...cache.nameListActive]
    );
  });
  socket.on('guest come', function(data) {
    cache.nameListActive.add(data);
    cache.nameList[data] = 7200000;
    socket.nickname = data;
    io.emit('guest update',
      [...cache.nameListActive]
    );
  });
  socket.on('guest leave', function(data) {
    cache.nameListActive.delete(data);
    delete cache.nameList[data];
    socket.nickname = undefined;
    io.emit('guest update',
      [...cache.nameListActive]
    );
  });
  socket.on('heart beat', function() {
    if (socket.nickname != undefined) {
      cache.nameList[socket.nickname] = 7200000;
    }
  });
});

app.use(webpackDev(compiler, {
  contentBase: webpackConf.output.path,
  publicPath: webpackConf.output.publicPath,
  hot: false
}));

// app.use(serve('./dist'));

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
    nick = new Buffer(nick, 'base64').toString();
    this.body = JSON.stringify({
      permit: true,
      nickname: nick
    });
  }
}));

app.use(route.post('/api/nickname', function*() {
  if (this.cookies.get('nickname') != undefined) {
    this.body = JSON.stringify({
      legal: 'self login'
    })
  } else {
    var rawBody = yield parse(this, {});
    if (!(rawBody in cache.nameList)) {
      var body = new Buffer(rawBody).toString('base64');
      this.cookies.set('nickname', body, {
        maxAge: 7200000
      });
      this.body = JSON.stringify({
        legal: 'yes'
      });
    } else {
      this.body = JSON.stringify({
        legal: 'repeat'
      });
    }
  }
}));

app.use(route.post('/api/logout', function*() {
  var nick = this.cookies.get('nickname');
  this.cookies.set('nickname', undefined);
  if (nick != undefined) {
    nick = new Buffer(nick, 'base64').toString();
    cache.nameListActive.delete(nick);
    delete cache.nameList[nick];
  }
  this.body = '';
}));

server.listen(process.env.PORT || 5000, function() {
  console.log('listening');
});

server.on('error', err => {
  console.log('error --> ', err.message);
  process.exit(1);
});
