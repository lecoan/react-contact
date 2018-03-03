import React from 'react';
import PropTypes from 'prop-types';
import Table from './ContactTable';
import {withStyles} from 'material-ui/styles';
import Dialog, {
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';

const styles = theme => ({
  container: {
    position: 'relative'
  },
  table: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'
  }
});

class Result extends React.Component {

  render() {
    const {
      open, 
      searchResult, 
      handleModify, 
      handleDelete, 
      handleClose,
      classes
    } = this.props;
    return (
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Search Result</DialogTitle>
        <DialogContent className={classes.container}>
          <Table
            className={classes.table}
            contacts={searchResult}
            handleModify={handleModify}
            handleDelete={handleDelete}
          />
        </DialogContent>
      </Dialog>
    );
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    searchResult: PropTypes.array.isRequired, 
    handleModify: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
  }
}

export default withStyles(styles)(Result);