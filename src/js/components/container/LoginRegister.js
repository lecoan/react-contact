import LoginView from '../presentational/LoginView';
import {connect} from 'react-redux';
import React from 'react';
import API from 'API';
import {withRouter} from  'react-router-dom';
import {login} from "REDUX/action";

/**
 * @param dispatch 用来分发action
 * @returns K:V..
 */
const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

class LoginProvider extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleLogin(username, password) {
      API.login(username, password).then(res=>{
        let {data} = res;
        this.props.login(data);
        this.props.history.push('/');
      }).catch(e => {
        alert(e.message);
      });
  }

  handleRegister(username, password) {
    API.register(username, password).then(res=>{
      this.props.history.push('/');
    }).catch(e => {
      alert(e.message);
    });
  }

  render() {
    return (
      <LoginView
        handleLogin={this.handleLogin}
        handleRegister={this.handleRegister}
      />
    )
  }
}

/**
 * withRouter(component): 传入props history用来动态路由
 * connect(mapState, mapDispatch): 使组件可以访问并修改store
 */
export default withRouter(connect(null, mapDispatchToProps)(LoginProvider));