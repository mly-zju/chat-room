import React from 'react'
import TypeIn from '../typein/index.js'
import MsgShow from '../msgshow/index.js'
import NameList from '../namelist/index.js'
import Nav from '../nav/index.js'

require('./index.less');

class ChatAll extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.checkLogin();
  }
  render() {
    const {handleClick, nameList, msgList, nickName, handleSubmit} = this.props;
    if (nickName == '') {
      return null;
    } else {
      return (
        <div className='chat-wrap'>
          <Nav handleClick={handleClick} nickName={nickName}/>
          <div className='message-wrap'>
            <NameList nameList={nameList}/>
            <div className='typein-wrap'>
              <MsgShow msgList={msgList}/>
              <TypeIn handleSubmit={handleSubmit} nickName={nickName}/>
            </div>
          </div>
        </div>
      )
    }

  }
}

export default ChatAll
