import React from 'react'
import {hashHistory} from 'react-router'

require('./index.less');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    fetch('/api/nickname', {
      method: 'POST',
      body: this.refs.nick.value,
      credentials: 'include'
    }).then(function(res) {
      if (res.ok) {
        hashHistory.push('/');
      }
    });
  }
  render() {
    return (
      <div className='nick-name'>
        <h2>起一个昵称吧！</h2>
        <input ref='nick'/>
        <button onClick={this.handleClick}>确定</button>
      </div>
    )
  }
}

export default Login
