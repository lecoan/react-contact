import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableFooter,
  TablePagination,
  TableRow
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FirstPageIcon from 'material-ui-icons/FirstPage';
import LastPageIcon from 'material-ui-icons/LastPage';
import ArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import ArrowRight from 'material-ui-icons/KeyboardArrowRight';
import Delete from 'material-ui-icons/Delete';
import Change from 'material-ui-icons/ChangeHistory';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const actionStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class TablePaginationActions extends React.Component {

  constructor(props) {
    super(props);
    this.handleLastPageClick = this.handleLastPageClick.bind(this);
    this.handleFirstPageClick = this.handleFirstPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
  }

  handleFirstPageClick(event) {
    this.props.onChangePage(event, 0);
  }

  handleLastPageClick(event) {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) -1)
    );
  }

  handleNextPageClick(event) {
    this.props.onChangePage(event, this.props.page+1);
  }

  handlePrevPageClick(event) {
    this.props.onChangePage(event, this.props.page-1);
  }

  render() {
    const {count, page, rowsPerPage, classes} = this.props;
    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageClick}
          disabled={page===0}
          aria-label="First Page"
        >
          <FirstPageIcon/>
        </IconButton>
        <IconButton
          onClick={this.handlePrevPageClick}
          disabled={page===0}
          aria-label="Previous Page"
        >
          <ArrowLeft/>
        </IconButton>
        <IconButton
          onClick={this.handleNextPageClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          <ArrowRight/>
        </IconButton>
        <IconButton
          onClick={this.handleLastPageClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          <LastPageIcon/>
        </IconButton>
      </div>
    )
  }
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

const Actions =  withStyles(actionStyles)(TablePaginationActions);

const tableStyles = theme => ({
  root: {
    display: 'inline-block',
    width: 'auto'
  },
  table: {
    width: 900,
    height: 500
  }
});

class ContactTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: props.contacts,
      page: 0,
      rowsPerPage: 5
    };
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleClose() {
    this.setState({openForm: false});
  }

  handlePost(contact) {
    this.handleClose();
    this.props.handleModify(contact);
  }

  componentWillReceiveProps(props) {
    this.setState({contacts: props.contacts});
  }

  handleChangePage(event, page){
    this.setState({page});
  }

  render() {
    let {contacts, rowsPerPage, page} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, contacts.length - page * rowsPerPage);
    const {handleDelete, classes} = this.props;
    // const image = require('/static/images.jpeg');
    return (
      <Grid container className={classes.root} >
        <Paper>
          <Table className={classes.table} >
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  email
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  QQ
                </TableCell>
                <TableCell>
                  Wechat
                </TableCell>
                <TableCell>
                  Operation
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map(contact => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.qq}</TableCell>
                  <TableCell>{contact.wechat}</TableCell>
                  <TableCell>
                    <IconButton>
                      <Delete onClick={()=>handleDelete(contact.id)}/>
                    </IconButton>
                    <IconButton>
                      <Change onClick={()=>this.props.handleModify('modify', contact)}/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{height: 49*emptyRows}}
                >
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={6}
                  count={contacts.length}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  onChangePage={this.handleChangePage}
                  rowsPerPageOptions={[]}
                  Actions={Actions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </Grid>
    )
  }
}

ContactTable.propTypes = {
  contacts: PropTypes.array.isRequired,
  handleModify: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default withStyles(tableStyles)(ContactTable);