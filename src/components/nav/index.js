import React from 'react'
import { hashHistory } from 'react-router'

require('./index.less');

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var {handleClick, nickName} = this.props;
    return (
      <div className='nav'>
        <span>Welcome, {nickName}!</span>
        <button onClick={handleClick}>退出</button>
      </div>
    )
  }
}

export default Nav
