import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ChatAllContainer from './container/chatAll.js'
import LoginContainer from './container/login.js'
import createSocketMiddleware from './redux_middleware'
import io from 'socket.io-client'
import reducers from './reducer'
import './index.less'

var socket = io();
var socketMiddleware = createSocketMiddleware(socket);

var store = createStore(reducers, applyMiddleware(socketMiddleware));

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={ChatAllContainer}/>
      <Route path='/login' component={LoginContainer}/>
    </Router>
  </Provider>
  ,
  document.getElementById('test'));
