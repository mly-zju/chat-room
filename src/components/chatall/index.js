import React from 'react'
import TypeIn from '../typein/index.js'
import MsgShow from '../msgshow/index.js'
import NameList from '../namelist/index.js'
import Nav from '../nav/index.js'

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
          <Nav handleClick={handleClick}/>
          <NameList nameList={nameList}/>
          <MsgShow msgList={msgList}/>
          <TypeIn handleSubmit={handleSubmit} nickName={nickName}/>
        </div>
      )
    }

  }
}

export default ChatAll
