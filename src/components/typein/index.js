import React from 'react'

require('./index.less');

class TypeIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.messageSend = this.messageSend.bind(this);
    this.messageType = this.messageType.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }
  messageType(e) {
    this.setState({
      text: e.target.value
    });
  }
  messageSend(e) {
    this.setState({
      text: ''
    });
    var value = this.refs.myInput.value;
    //只有不为空字符串的时候才执行
    if (value != 0) {
      var regLeft = /</g;
      var regRight = />/g;
      value = value.replace(regLeft, '&lt;');
      value = value.replace(regRight, '&gt;');
      value = value.replace(/\n/g, '<br/>');
      var nickName = this.props.nickName;
      this.props.handleSubmit(value, nickName);
    }
  }
  handleDown(e) {
    if (e.keyCode == 13) {
      if (!e.ctrlKey) {
        e.preventDefault();
        this.refs.myButton.click();
      } else {
        this.setState((prevState) => {
          return {
            text: prevState.text + '\n'
          }
        });
      }
    }
  }
  handleUp(e) {
    if (e.keyCode == 13 && !e.ctrlKey) {
      e.preventDefault();
    }
    var scrollTop = this.refs.myInput.scrollHeight - this.refs.myInput.offsetHeight;
    this.refs.myInput.scrollTop = scrollTop;
  }
  handlePress(e) {
    if (e.keyCode == 13 && !e.ctrlKey) {
      e.preventDefault();
    }
  }
  render() {
    return (
      <div className='type-in'>
        <textarea ref="myInput" onKeyUp={this.handleUp} onChange={this.messageType} onKeyDown={this.handleDown} value={this.state.text} onKeyPress={this.handlePress}>
        </textarea>
        <button onClick={this.messageSend} ref="myButton">
          提交
        </button>
      </div>
    )
  }
}

export default TypeIn
