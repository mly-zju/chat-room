import React from 'react'
import {render} from 'react-dom'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import TypeIn from './components/typein/index.js'
import MsgShow from './components/msgshow/index.js'
import Login from './components/login/index.js'
import NameList from './components/namelist/index.js'
import Nav from './components/nav/index.js'

var io = require('socket.io-client');
var socket = io();

require('./index.less');

var EventHandler = function() {
  this.events = {};
  this.subscribe = function(type, fn) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(fn);
    return this.events[type].length - 1;
  };
  this.unsubscribe = function(type, index) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].splice(index, 1);
  }
  this.publish = function(type, data) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].forEach(function(ele) {
      ele(data);
    })
  };
}

var eventHandler = new EventHandler();

eventHandler.subscribe('typeIn', function(data) {
  socket.emit('from client', data);
});

socket.on('from server', function(data) {
  eventHandler.publish('msgArrive', data);
});

socket.on('new guest', function(data) {
  eventHandler.publish('namelist fresh', data);
});

socket.on('guest leave', function(data) {
  eventHandler.publish('namelist fresh', data);
});

var Chat = React.createClass({
  getInitialState() {
    return {nickname: ''}
  },
  componentWillMount() {
    var self = this;
    fetch('/api/index', {
      method: 'GET',
      credentials: 'include'
    }).then(function(res) {
      return res.json()
    }).then(function(data) {
      //如果没有cookie，则证明没有登录过，重定向到昵称页面
      if (!data.permit) {
        hashHistory.push('/login');
      } else {
        socket.emit('new guest', {nickname: data.nickname});
        self.setState({nickname: data.nickname});
      }
    })
  },
  render() {
    return (
      <div className='chat-wrap'>
        <Nav/>
        <NameList eventHandler={eventHandler}/>
        <MsgShow eventHandler={eventHandler}/>
        <TypeIn eventHandler={eventHandler} nickname={this.state.nickname}/>
      </div>
    )
  }
});

render(
  <Router history={hashHistory}>
  <Route path='/' component={Chat}/>
  <Route path='/login' component={Login}/>
</Router>, document.getElementById('test'));
