import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles'; 
import Login from './Login';
import Register from './Register';
import Slide from 'material-ui/transitions/Slide';
import Grow from 'material-ui/transitions/Slide';
import Grid from 'material-ui/Grid';

const styles = theme => ({

});

class LoginView extends React.Component {
  
  state = {
    login: true,
    register: false,
    slideDirection: 'up'
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({slideDirection: 'down'});
    }, 500);
    
  }

  render() {
    const {login, register, slideDirection} = this.state;
    const {handleLogin, handleRegister} = this.props;
    return (
      <Grid 
        container
        justify="center"
        alignItems="center"
        style={{
          height: '100%',
          background: '#42A5F5'
        }}
        >
        <Slide
          in={true} 
          direction={slideDirection} 
          mountOnEnter 
          unmountOnExit
          >
          <div>
            <Grow in={login} mountOnEnter unmountOnExit>
              <Login
                handleLogin={handleLogin}
                onRegisterClick={() => {
                  this.setState({login: false});
                  setTimeout(() => {
                    this.setState({register: true})
                  }, 500);
                }}
                />
            </Grow>
            <Grow in={register} mountOnEnter unmountOnExit>
              <Register 
                handleRegister={handleRegister}
                onLoginClick = {() => {
                  this.setState({register: false});
                  setTimeout(() => {
                    this.setState({login: true})
                  }, 500);
                }}  
              />
            </Grow>
          </div>
        </Slide>
      </Grid>
    );
  }
  
  static propTypes = {
    handleLogin : PropTypes.func.isRequired,
    handleRegister: PropTypes.func.isRequired
  }
}

export default withStyles(styles)(LoginView);