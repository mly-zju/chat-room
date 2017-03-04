import { message_update, guest_update } from '../action'

function createSocketMiddleware(socket) {
  var eventFlag = false;
  return store => next => action => {
    if (!eventFlag) {
      eventFlag = true;
      // console.log('begin to mount');
      socket.on('guest update', function(data) {
        next(guest_update(data));
      });
      socket.on('msg from server', function(data) {
        next(message_update(data));
      });
      socket.on('self logout', function() {
        window.location.reload();
      });
      setInterval(function() {
        socket.emit('heart beat');
      }, 10000);
    }
    if (action.type == 'MSG_UPDATE') {
      socket.emit('msg from client', action.msg);
    } else if (action.type == 'NICKNAME_GET') {
      socket.emit('guest come', action.nickName);
    } else if (action.type == 'NICKNAME_FORGET') {
      socket.emit('guest leave', store.getState().nickName);
    }
    return next(action);
  }
}

export default createSocketMiddleware
