import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  container: {
    height: '100%'
  },
  root: {
    width: 400,
    height: 250,
    padding: 40
  },
  button: {
    alignSelf: 'flex-end'
  }
});

class Login extends React.Component {

  state = {
    nameHelper: '',
    passHelper: '',
  }

  check = (username, password) => {
    let nameCheck = username.match(/^[A-Za-z0-9]{4,10}$/);
    let passCheck = password.match(/^[A-Za-z0-9]{4,10}$/);
    this.setState({
      nameHelper: nameCheck? '' : 'Username format not correct',
      passHelper: passCheck? '' : 'Password format not correct'
    });
    return nameCheck && passCheck;
  };

  render() {
    const {classes, handleLogin, onRegisterClick} = this.props;
    const {nameHelper, passHelper} = this.state;
    return (
      <Paper className={classes.root}>
        <Grid 
            container
            className={classes.container}
            direction="column"
            justify="space-around"
          >
          <TextField
            helperText={nameHelper}
            inputRef={input => this.nameInput=input}
            label="Username"
            type="text"
            required
          />
          <TextField
            helperText={passHelper}
            inputRef={input => this.passInput=input}
            label="Password"
            type="password"
            required
          />
          <Typography onClick={onRegisterClick}>Doesn't have one? register now!</Typography>
          <Button
            className={classes.button}
            variant="raised"
            color="secondary"
            onClick={() => {
              let username = this.nameInput.value;
              let password = this.passInput.value;
              if(this.check(username, password)) {
                handleLogin(username, password);
              }
            }}
          >
            Login
          </Button>
        </Grid>
      </Paper>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Login);