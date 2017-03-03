import React from 'react'

require('./index.less');

class NameList extends React.Component {
  constructor(props) {
    super(props);
  //   this.state = {
  //     list: []
  //   }
  //   this.index = this.props.eventHandler.subscribe('namelist fresh', function(data) {
  //     this.setState({list: data.list});
  //   }.bind(this));
  // }
  // componentWillUnmount() {
  //   this.props.eventHandler.unsubscribe('namelist fresh', this.index);
  }
  render() {
    var {nameList} = this.props;
    return (
      <ul className='name-list'>
        <li className='name-list-title'>在线用户:</li>
        {nameList.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
      </ul>
    )
  }
}

export default NameList
