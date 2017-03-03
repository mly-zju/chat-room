function message_update(msg) {
  return {
    type: 'MSG_UPDATE',
    msg
  }
}

function guest_update(nameList) {
  return {
    type: 'GUEST_UPDATE',
    nameList
  }
}

function nickname_get(nickName) {
  return {
    type: 'NICKNAME_GET',
    nickName
  }
}

function nickname_forget() {
  return {
    type: 'NICKNAME_FORGET'
  }
}

export { message_update, guest_update, nickname_get, nickname_forget }
