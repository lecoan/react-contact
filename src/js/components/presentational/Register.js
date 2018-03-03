import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  container: {
    height: '100%'
  },
  root: {
    padding: 40,
    width: 400,
    height: 300
  },
  button: {
    alignSelf: 'flex-end'
  }
});

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nameHelp: '',
      passHelp: '',
      repeatHelp: ''
    };
  }

  check = (username, password, error) => {
    let nameCheck = username.match(/^[A-Za-z0-9]{4,10}$/);
    let passCheck = password.match(/^[A-Za-z0-9]{4,10}$/);
    this.setState({
      repeatHelp: !error ? '' : 'Password not match',
      nameHelp: nameCheck? '' : 'Username format not correct',
      passHelp: passCheck? '' : 'Password format not correct'
    });
    return !error && nameCheck && passCheck;
  };

  render() {
    const {error, nameHelp, passHelp, repeatHelp} = this.state;
    const {classes, handleRegister, onLoginClick} = this.props;
    return (
      <Paper className={classes.root} >
        <Grid 
          container
          className={classes.container}
          direction="column"
          justify="space-around"
        >
            <TextField
              helperText={nameHelp}
              inputRef={input => this.nameInput=input}
              fullWidth
              label="Username"
              type="text"
              required
            />
            <TextField
              helperText={passHelp}
              inputRef={input => this.passInput=input}
              label="Password"
              type="password"
              required
            />
            <TextField
              helperText={repeatHelp}
              inputRef={input => this.repeatInput=input}
              label="Repeat password"
              type="password"
              error={error}
              onChange={() => {
                let pass = this.passInput.value;
                let repeat = this.repeatInput.value;
                this.setState({error: (pass !== repeat)});
              }}
            />
            <Typography onClick={onLoginClick}>Already have one? login now!</Typography>
          <Button
            className={classes.button}
            variant="raised"
            color="primary"
            onClick={() => {
              let username = this.nameInput.value;
              let password = this.passInput.value;
              if (this.check(username, password, error)) {
                handleRegister(username, password);
              }
            }}
          >
            Register
          </Button>
        </Grid>
      </Paper>
    );
  }
}

Register.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Register);