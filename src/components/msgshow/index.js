import React from 'react'

require('./index.less');

class MsgShow extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    var t = this.refs.myDiv;
    var scrollTop = t.scrollHeight - t.offsetHeight;
    t.scrollTop = scrollTop;
  }
  render() {
    var {msgList} = this.props;
    // console.log('from msgshow: ' + msgList[0].nickname);
    // var scrollTop = this.refs.myDiv.scrollHeight - this.refs.myDiv.scrollHeight;
    // this.refs.myDiv.scrollTop = scrollTop;
    return (
      <div ref='myDiv' className='msg-show'>
        <h5>群聊</h5>
        <ul>
          {msgList.map((item, index) => {
        if (item.msg != '') {
          return (
            <li key={index}>
                  <span>{item.nickName}:</span>
                  <div dangerouslySetInnerHTML={{
              __html: item.msg
            }}/>
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
