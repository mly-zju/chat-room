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
  handlePress(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      this.refs.myButton.click();
    }
  }
  handlePress2(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }
  handlePress3(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }
  render() {
    return (
      <div className='type-in'>
        <textarea ref="myInput" onKeyUp={this.handlePress2} onChange={this.messageType} onKeyDown={this.handlePress} value={this.state.text} onKeyPress={this.handlePress3}>
        </textarea>
        <button onClick={this.messageSend} ref="myButton">
          提交
        </button>
      </div>
    )
  }
}

export default TypeIn
