import React from 'react'
import { hashHistory } from 'react-router'

require('./index.less');

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var {handleClick} = this.props;
    return (
      <div className='nav'>
        A chat room using react+ redux+ socket.io+ koa
        <button onClick={handleClick}>退出</button>
      </div>
    )
  }
}

export default Nav
