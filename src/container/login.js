import { connect } from 'react-redux'
import Login from '../components/login'
import { message_update, guest_update, nickname_get } from '../action'
import { hashHistory } from 'react-router'

function mapStateToProps(state, ownProps) {
  return {
    nickName: state.nickName
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    checkLogin: function() {
      fetch('/api/auth', {
        method: 'GET',
        credentials: 'include'
      }).then(function(res) {
        return res.json()
      }).then(function(data) {
        //如果有cookie，证明已经登录，无需再次登录
        if (data.permit) {
          hashHistory.push('/');
        }
      })
    },
    handleClick: function(e) {
      var nickname = this.refs.nick.value;
      fetch('/api/nickname', {
        method: 'POST',
        body: nickname,
        credentials: 'include'
      }).then(function(res) {
        if (res.ok) {
          dispatch(nickname_get(nickname));
          hashHistory.push('/');
        }
      });
    }
  }
}

var LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer
