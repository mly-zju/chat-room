import React from 'react'
// import { hashHistory } from 'react-router'

require('./index.less');

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.checkLogin();
  }
  render() {
    var handleClick = this.props.handleClick.bind(this);
    if (this.props.nickName !== '') {
      return null;
    } else {
      return (
        <div className='nick-name'>
        <h2>起一个昵称吧！</h2>
        <input ref='nick'/><button onClick={handleClick}>确定</button>
      </div>
      )
    }

  }
}

export default Login
