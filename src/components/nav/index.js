import React from 'react'
import {hashHistory} from 'react-router'

require('./index.less');

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    fetch('/api/logout', {
      method: 'POST',
      body: '',
      credentials: 'include'
    }).then(function(res) {
      if (res.ok) {
        hashHistory.push('/login');
      }
    });
  }
  render() {
    return (
      <div className='nav'>
        A chat room using react+socket.io+koa
        <button onClick={this.handleClick}>退出</button>
      </div>
    )
  }
}

export default Nav
