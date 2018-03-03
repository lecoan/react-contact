import React from 'react';
import classNames from 'classnames';
import { findDOMNode } from "react-dom";
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import SettingIcon from 'material-ui-icons/Settings';
import SearchIcon from 'material-ui-icons/Search';
import ExitIcon from 'material-ui-icons/ExitToApp';
import Grow from 'material-ui/transitions/Grow';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
//import T from 'react-transition-group';

const styles = theme => ({
  root: {
    height: 300,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 100
  },
  popover: {
    padding: 10
  },
  settings: {
    transition: '0.5s ease-in-out'
  },
  rotate: {
    transform: 'rotate(120deg)'
  }
})

class Settings extends React.Component {

  state = {
    open: false,
    search: false,
    anchor: null
  }

  switch = () => {
    this.setState({open: !this.state.open});
    if(this.state.anchor === null) {
      this.setState({anchor: findDOMNode(this.searchBtn)});
    }
  };
  // () => this.setState({search: !this.state.search})
  render() {
    const {open, search, anchor} = this.state;
    const {handleAdd, handleSearch, handleLogout, classes} = this.props;
    console.log(classes.settings);
    return (
      <Grid container className={classes.root}>
        <Grow in={true} style={{transitionDelay: 700}}>
          <Button
            variant="fab"
            color="secondary"
            onClick={this.switch}
          >
            <SettingIcon 
              className={classNames({
                [classes.settings]: true,
                [classes.rotate]: open
              })}
            />
            </Button>
        </Grow>
        <Grow in={open}>
          <Button
            mini
            variant="fab"
            onClick={() => {this.setState({search: !this.state.search})}}
            ref={btn => this.searchBtn =  btn}
          >
            <SearchIcon/>
          </Button>         
        </Grow>
        <Grow in={open} {...(open ? { timeout: 500 } : {})}>
          <Button
            mini
            variant="fab"
            onClick={handleAdd}
          >
            <AddIcon/>
          </Button>
        </Grow>
        <Grow in={open} {...(open ? { timeout: 1000 } : {})}>
          <Button
            mini
            variant="fab"
            onClick={handleLogout}
          >
            <ExitIcon/>
          </Button>
        </Grow>
        <Popover
          className={classes.popover}
          open={search}
          anchorEl={anchor}
          anchorReference="anchorEl"
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'right'
          }}
          onClose={() => this.setState({search: false})}
        >
          <TextField inputRef={input => this.searchInput = input}/>
          <Button
            onClick={() => handleSearch(this.searchInput.value)}
            color="primary"
            variant="raised"
          >
            Search
          </Button>
        </Popover>
      </Grid>
    );
  }

  static propTypes = {
    handleAdd: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired
  }
}

export default withStyles(styles)(Settings);