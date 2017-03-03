import { combineReducers } from 'redux'

function nickname_reducer(state = '', action) {
  switch (action.type) {
    case 'NICKNAME_GET':
      return action.nickName;
    case 'NICKNAME_FORGET':
      return '';
    default:
      return state;
  }
}

function name_reducer(state = [], action) {
  switch (action.type) {
    case 'GUEST_UPDATE':
      return action.nameList;
    default:
      return state;
  }
}

function msg_reducer(state = [], action) {
  switch (action.type) {
    case 'MSG_UPDATE':
      var newState = [];
      newState = [...state, action.msg];
      return newState;
    case 'NICKNAME_FORGET':
      return [];
    default:
      return state;
  }
}

var reducers = combineReducers({
  nickName: nickname_reducer,
  nameList: name_reducer,
  msgList: msg_reducer
});

export default reducers
