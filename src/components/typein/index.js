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
    var nickName = this.props.nickName;
    this.props.handleSubmit(value, nickName);
  }
  render() {
    return (
      <div className='type-in'>
        <input ref="myInput" onChange={this.messageType} value={this.state.text}/>
        <button onClick={this.messageSend}>
          提交
        </button>
      </div>
    )
  }
}

export default TypeIn
