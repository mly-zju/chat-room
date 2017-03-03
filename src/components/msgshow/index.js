import React from 'react'

require('./index.less');

class MsgShow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var {msgList} = this.props;
    // console.log('from msgshow: ' + msgList[0].nickname);
    return (
      <div className='msg-show'>
        <ul>
          {msgList.map((item, index) => {
        if (item.msg != '') {
          return (
            <li key={index}>
                  <span>{item.nickName}:</span>
                  <br/>
                  {item.msg}
                </li>
          )
        }
      })}
        </ul>
      </div>
    )
  }
}

export default MsgShow
