import React from 'react'

require('./index.less');

class MsgShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.index1 = this.props.eventHandler.subscribe('typeIn', function(data) {
      this.setState((preState) => {
        preState.data.push(data);
        return preState;
      });
    }.bind(this));
    this.index2 = this.props.eventHandler.subscribe('msgArrive', function(data) {
      this.setState((preState) => {
        preState.data.push(data);
        return preState;
      });
    }.bind(this));
  }
  componentWillUnmount() {
    this.props.eventHandler.unsubscribe('typeIn', this.index1);
    this.props.eventHandler.unsubscribe('msgArrive', this.index2);
  }
  render() {
    var list = this.state.data;
    return (
      <div className='msg-show'>
        <ul>
          {list.map((item, index) => {
            if (item.msg != '') {
              return (
                <li key={index}>
                  <span>{item.nickname}:</span><br/>{item.msg}</li>
              )
            }
          })}
        </ul>
      </div>
    )
  }
}

export default MsgShow
